const hre = require("hardhat");

const { ethers, upgrades } = require("hardhat");

async function main() {
  const Unramp = await hre.ethers.getContractFactory("Unramp");

  const [account1, account2, account3] = await ethers.getSigners();

  let unramp = await Unramp.attach(
    "0x86F745BE41e778c01563A83Da90E2d85bbeb114c",
  );

  let token = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

  //------------------------------------test create post

  //   await unramp.createPost(token, "rial", 1, 1000, "cash");

  //   console.log("ss", await unramp.idToPost(3));
  //   console.log("_Id", await unramp._Id());
  //   console.log(
  //     "check user markerStruct",
  //     (
  //       await unramp.returnUserMakerStruct(
  //         "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  //         0,
  //       )
  //     ).creator,
  //   );

  //------------------------------------test create order

  //   await unramp
  //     .connect(account2)
  //     .createOrder(0, ethers.utils.parseUnits("10", "ether"));
  //   console.log("_Id", await unramp._orderId());

  //   console.log(
  //     "check makerCreatorToOrdersId",
  //     await unramp.returnMakerOrders(
  //       "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  //       0,
  //     ),
  //   );

  //------------------------------------test acceptOrderFromMaker

  //   await unramp.acceptOrderFromMaker(0);

  //   console.log(
  //     "check makerCreatorToOrdersId",
  //     await unramp.returnMakerOrders(
  //       "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  //       0,
  //     ),
  //   );

  //------------------------------------test finalAcceptFromOrderCreator

  //   await unramp.connect(account2).finalAcceptFromOrderCreator(0);

  //   console.log(
  //     "check makerCreatorToOrdersId",
  //     await unramp.returnMakerOrders(
  //       "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  //       0,
  //     ),
  //   );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
