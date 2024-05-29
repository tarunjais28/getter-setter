import {
  initProgram,
  fetchStorage,
  set,
  setWithotherProgram,
  addWhitelist,
} from "./getter-setter";

const callTheFunction = async () => {
  console.log("Triggering functions , please wait !");
  // ==============================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // await initProgram();
  // await fetchStorage();
  // await set();
  // await addWhitelist();
  await fetchStorage();
  await setWithotherProgram();
  await fetchStorage();

  console.log("Functions Triggered, success !");
  console.log("sent =>>>>>>>>");
  // ==============================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // ==============================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
};

callTheFunction();

// npm start run
