import { mount } from "@vue/test-utils";
import NumberToEnglish from "../components/NumberToEnglish";

describe("Testing NumberToEnglish method...", () => {
  const wrapper = mount(NumberToEnglish);
  test('Testing numberToEnglish(1), "one", "1 -> one"', () => {
    expect(wrapper.vm.numberToEnglish(1)).toEqual("one");
  });
  test('Testing numberToEnglish(5), "five", "5 -> five"', () => {
    expect(wrapper.vm.numberToEnglish(5)).toEqual("five");
  });
  test('Testing numberToEnglish(10), "ten", "10 -> ten"', () => {
    expect(wrapper.vm.numberToEnglish(10)).toEqual("ten");
  });
  test('Testing numberToEnglish(11), "eleven", "11 -> eleven"', () => {
    expect(wrapper.vm.numberToEnglish(11)).toEqual("eleven");
  });
  test('Testing numberToEnglish(12), "twelve", "12 -> twelve"', () => {
    expect(wrapper.vm.numberToEnglish(12)).toEqual("twelve");
  });
  test('Testing numberToEnglish(18), "eighteen", "18 -> eighteen"', () => {
    expect(wrapper.vm.numberToEnglish(18)).toEqual("eighteen");
  });
  test('Testing numberToEnglish(20), "twenty", "20 -> twenty"', () => {
    expect(wrapper.vm.numberToEnglish(20)).toEqual("twenty");
  });
  test('Testing numberToEnglish(19000), "nineteen thousand", "19000 -> nineteen thousand"', () => {
    expect(wrapper.vm.numberToEnglish(19000)).toEqual("nineteen thousand ");
  });
  test('Testing numberToEnglish(319000), "three hundred nineteen thousand", "319000 -> three hundred nineteen thousand"', () => {
    expect(wrapper.vm.numberToEnglish(319000)).toEqual(
      "three hundred and nineteen thousand "
    );
  });
  test('Testing numberToEnglish(1000000), "one million", "1000000 -> one million"', () => {
    expect(wrapper.vm.numberToEnglish(1000000)).toEqual("one million ");
  });
  test('Testing numberToEnglish(-6000006), "negative six million six", "-6000006 -> negative six million and six"', () => {
    expect(wrapper.vm.numberToEnglish(-6000006)).toEqual(
      "negative six million and six"
    );
  });
  test('Testing numberToEnglish(0), "zero", "0 -> zero"', () => {
    expect(wrapper.vm.numberToEnglish(0)).toEqual("zero");
  });
});
