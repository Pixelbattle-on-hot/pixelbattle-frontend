import { connect, Contract, keyStores } from "near-api-js";
import { Pixel } from "./types.ts";
import { cellsOnOneSide, contractName, defaultColor } from "./constants.ts";

export async function getContract() {
  const connectionConfig = {
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://testnet.mynearwallet.com/",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://testnet.nearblocks.io",
  };

  // connect to NEAR
  const nearConnection = await connect(connectionConfig);
  // const response = await contract.view_method_name({ arg_name: "arg_value" });

  const account = await nearConnection.account("sender-account.near");
  return new Contract(account, contractName, {
    changeMethods: [],
    viewMethods: [
      "get_pixel",
      "get_field_row",
      "number_of_blocks_unchanged",
      "is_game_finished",
    ],
    useLocalViewExecution: false,
  });
}

export async function getPixel(contract, x, y) {
  const data = await contract.get_pixel({ position_x: x, position_y: y });
  if (data === null) {
    return { color: defaultColor, price: 0.01, owner: null } as Pixel;
  }
  return { color: data.color, price: data.price, owner: data.owner } as Pixel;
}

export async function getFieldRow(contract, y) {
  const data: Array<any> = await contract.get_field_row({ position_y: y });
  const to_return = new Array(cellsOnOneSide).fill({
    color: defaultColor,
    price: 0.01,
    owner: null,
  }) as Pixel[];

  data.forEach((pixel) => {
    const i = pixel.position_y;
    to_return[i] = {
      color: pixel.color,
      price: pixel.price,
      owner: pixel.owner,
    } as Pixel;
  });
  return to_return;
}

export async function getNumberOfBlocksUnchanged(contract): Promise<number> {
  return await contract.number_of_blocks_unchanged();
}

export async function getIsGameFinished(contract): Promise<boolean> {
  return await contract.is_game_finished();
}
