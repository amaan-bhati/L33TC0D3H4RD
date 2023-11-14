class FreqStack {
    constructor() {
        this.freqMap = new Map();
        this.groupMap = new Map();
        this.maxFreq = 0;
    }

    push(val) {
        const freq = (this.freqMap.get(val) || 0) + 1;
        this.freqMap.set(val, freq);

        if (!this.groupMap.has(freq)) {
            this.groupMap.set(freq, []);
        }
        this.groupMap.get(freq).push(val);

        this.maxFreq = Math.max(this.maxFreq, freq);
    }

    pop() {
        const mostFrequentGroup = this.groupMap.get(this.maxFreq);
        const val = mostFrequentGroup.pop();
        this.freqMap.set(val, this.freqMap.get(val) - 1);

        if (mostFrequentGroup.length === 0) {
            this.maxFreq--;
        }

        return val;
    }
}
