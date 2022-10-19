const main = async () => {
    const [owner, randomPerson, randomPerson2] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory(
        'WavePortal'
    );
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log('Contract deployed to:', waveContract.address);
    console.log('Contract deployed by:', owner.address);

    await waveContract.getTotalWaves();

    const waveTxn = await waveContract.wave();
    await waveTxn.wait();

    await waveContract.getTotalWaves();

    const connectedPerson = waveContract.connect(randomPerson);

    const secondWaveTxn = await connectedPerson.wave();
    await secondWaveTxn.wait();

    await waveContract.getTotalWaves();
    await connectedPerson.getWavesFromAddress();

    const connectedPerson2 = waveContract.connect(randomPerson2);
    await connectedPerson2.wave().then((tx) => tx.wait());
    await connectedPerson2.wave().then((tx) => tx.wait());

    await waveContract.getTotalWaves();
    await connectedPerson2.getWavesFromAddress();

    const waves = await waveContract.getAllWavers();
    console.log('test', waves);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
