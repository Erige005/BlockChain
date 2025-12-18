const hre = require("hardhat");

async function main() {
  // 1. Lay thong tin tai khoan se deploy
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // 2. Lay file hop dong da bien dich
  const Copyright = await hre.ethers.getContractFactory("Copyright");

  // 3. Bat dau qua trinh deploy
  const copyrightContract = await Copyright.deploy();

  // 4. Cho den khi deploy hoan tat
  await copyrightContract.waitForDeployment();

  // 5. In ra dia chi cua contract sau khi deploy thanh cong
  console.log("Copyright contract deployed to:", copyrightContract.target);
}

// Boilerplate de xu ly loi
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
