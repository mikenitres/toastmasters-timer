export function timerApp() {
    const savedState = JSON.parse(localStorage.getItem('toastmastersTimer')) || {};

    return {
        // Timing thresholds
        greenThreshold: savedState.greenThreshold || 1 * 60,
        yellowThreshold: savedState.yellowThreshold || 1.5 * 60,
        redThreshold: savedState.redThreshold || 2 * 60,
        resetThreshold: savedState.resetThreshold || 2.5 * 60,

        // Current timer state
        elapsedTime: savedState.elapsedTime || 0,
        timerInterval: null,
        currentColor: savedState.currentColor || 'white',
        isRunning: false,

        // Time input values with new defaults
        greenMinutes: Math.floor((savedState.greenThreshold || 1 * 60) / 60),
        greenSeconds: (savedState.greenThreshold || 1 * 60) % 60,
        yellowMinutes: Math.floor((savedState.yellowThreshold || 1.5 * 60) / 60),
        yellowSeconds: (savedState.yellowThreshold || 1.5 * 60) % 60,
        redMinutes: Math.floor((savedState.redThreshold || 2 * 60) / 60),
        redSeconds: (savedState.redThreshold || 2 * 60) % 60,
        resetMinutes: Math.floor((savedState.resetThreshold || 2.5 * 60) / 60),
        resetSeconds: (savedState.resetThreshold || 2.5 * 60) % 60,

        init() {
            this.updateColor();
            this.$watch('elapsedTime', () => this.saveState());
            this.$watch('currentColor', () => this.saveState());
            this.$watch('greenThreshold', () => this.saveState());
            this.$watch('yellowThreshold', () => this.saveState());
            this.$watch('redThreshold', () => this.saveState());
            this.$watch('resetThreshold', () => this.saveState());
        },

        saveState() {
            localStorage.setItem('toastmastersTimer', JSON.stringify({
                greenThreshold: this.totalGreenTime,
                yellowThreshold: this.totalYellowTime,
                redThreshold: this.totalRedTime,
                resetThreshold: this.totalResetTime,
                elapsedTime: this.elapsedTime,
                currentColor: this.currentColor
            }));
        },

        // Computed thresholds
        get totalGreenTime() {
            return (this.greenMinutes * 60) + this.greenSeconds;
        },
        get totalYellowTime() {
            return (this.yellowMinutes * 60) + this.yellowSeconds;
        },
        get totalRedTime() {
            return (this.redMinutes * 60) + this.redSeconds;
        },
        get totalResetTime() {
            return (this.resetMinutes * 60) + this.resetSeconds;
        },

        startTimer() {
            if (this.timerInterval) clearInterval(this.timerInterval);
            this.isRunning = true;

            this.timerInterval = setInterval(() => {
                this.elapsedTime++;
                this.updateColor();
                this.triggerColorUpdate();
            }, 1000);
        },

        pauseTimer() {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
            this.isRunning = false;
            this.saveState();
        },

        resetTimer() {
            this.pauseTimer();
            this.elapsedTime = 0;
            this.currentColor = 'white';
            this.updatePresentDisplay();
            this.saveState();
        },

        getCurrentColor() {
            if (this.elapsedTime >= this.totalResetTime) return 'white';
            if (this.elapsedTime >= this.totalRedTime) return 'red';
            if (this.elapsedTime >= this.totalYellowTime) return 'yellow';
            if (this.elapsedTime >= this.totalGreenTime) return 'green';
            return 'white';
        },

        updateColor() {
            const newColor = this.getCurrentColor();
            if (newColor !== this.currentColor) {
                this.currentColor = newColor;
                this.triggerColorUpdate();
            }
        },

        triggerColorUpdate() {
            // Use window.postMessage for cross-page communication
            // https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
            window.postMessage({
                type: 'updateColors',
                color: this.currentColor
            }, '*');
        },

        updatePresentDisplay() {
            this.triggerColorUpdate();
        },

        formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        },

        validateSeconds(input) {
            let value = parseInt(input);
            if (isNaN(value)) return 0;
            return Math.min(59, Math.max(0, value));
        },

        validateMinutes(input) {
            let value = parseInt(input);
            if (isNaN(value)) return 0;
            return Math.min(100, Math.max(0, value));
        }
    };
}