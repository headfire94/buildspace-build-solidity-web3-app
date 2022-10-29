const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory(
        'WavePortal'
    );
    const [me] = await hre.ethers.getSigners();
    const balance = await hre.ethers.provider.getBalance(me.address);
    const contractBalance = hre.ethers.utils.parseEther('0.001');
    if (balance.lt(contractBalance)) {
        throw new Error('not enough funds');
    }
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.001')
    });

    await waveContract.deployed();

    console.log('WavePortal address: ', waveContract.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();
