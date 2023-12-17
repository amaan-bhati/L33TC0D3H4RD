const minimumEffort = (tasks) => {
    tasks.sort((a, b) => (b[1] - b[0]) - (a[1] - a[0]));

    let minimumEnergy = tasks[0][1];
    let actualEnergy = minimumEnergy - tasks[0][0];

    for (let i = 1; i < tasks.length; i++) {
        const nextMinEnergy = tasks[i][1];
        const nextActualEnergy = tasks[i][0];

        if (actualEnergy < nextMinEnergy) {
            minimumEnergy += nextMinEnergy - actualEnergy;
            actualEnergy = nextMinEnergy - nextActualEnergy;
        }
        else {
            actualEnergy -= nextActualEnergy;
        }
    }

    return minimumEnergy;
};
