import { classNames, convertToAmPm, formatDate } from "..";

describe("Utility functions", () => {
  test("classNames should concatenate classes", () => {
    const result = classNames("class1", "class2", null, undefined, "class3");
    assert.equal(result, "class1 class2 class3");
  });

  test("formatDate should format dates correctly", () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const resultToday = formatDate(today);
    const resultYesterday = formatDate(yesterday);

    assert.equal(resultToday, "Today");
    assert.equal(resultYesterday, "Yesterday");
  });

  test("convertToAmPm should convert 24hr time to 12hr time", () => {
    const time24hr = "14:30";
    const result = convertToAmPm(time24hr);
    assert.equal(result, "02:30 pm");
  });
});
