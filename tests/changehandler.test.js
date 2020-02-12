let { ChangeHandler } = require("../src/changehandler");

describe("Tests for ChangeHandler", function() {
  // Set up a test below...

  test("amountDue is set based on an argument.", function() {
    let test = new ChangeHandler(1);
    expect(test.amountDue).toBe(1);
  });
  test("cashTendered is set to zero.", function() {
    let test = new ChangeHandler(999);
    expect(test.cashTendered).toBe(0);
  });
  test("Inserting a quarter adds 25", function() {
    let test = new ChangeHandler(999);
    test.insertCoin("quarter");
    expect(test.cashTendered).toBe(25);
  });
  test("Inserting a dime adds 10", function() {
    let test = new ChangeHandler(999);
    test.insertCoin("dime");
    expect(test.cashTendered).toBe(10);
  });
});
test("Inserting a nickel adds 5", function() {
  let test = new ChangeHandler(999);
  test.insertCoin("nickel");
  expect(test.cashTendered).toBe(5);
});
test("Inserting a penny adds 1", function() {
  let test = new ChangeHandler(999);
  test.insertCoin("penny");
  expect(test.cashTendered).toBe(1);
});
test("calling function multiple times", function() {
  let test = new ChangeHandler(999);
  test.insertCoin("nickel");
  test.insertCoin("nickel");
  test.insertCoin("nickel");
  expect(test.cashTendered).toBe(15);
});

test("Returns true if cashTendered more than amountDue", function() {
  let test = new ChangeHandler(25);
  test.insertCoin("penny");
  test.insertCoin("quarter");
  expect(test.isPaymentSufficient()).toBe(true);
});

test("Returns false if cashTendered less than amountDue.", function() {
  let test = new ChangeHandler(25);
  test.insertCoin("penny");
  test.insertCoin("nickel");
  expect(test.isPaymentSufficient()).toBe(false);
});

test("Returns true if cashTendered equal to amountDue", function() {
  let test = new ChangeHandler(25);
  test.insertCoin("quarter");
  expect(test.isPaymentSufficient()).toBe(true);
});

test("32 change produces: quarters: 1, dimes: 0, nickels: 1, pennies: 2.", function() {
  let test = new ChangeHandler(0);
  test.insertCoin("quarter");
  test.insertCoin("nickel");
  test.insertCoin("penny");
  test.insertCoin("penny");
  expect(test.giveChange()).toEqual({
    quarters: 1,
    dimes: 0,
    nickels: 1,
    pennies: 2
  });
});
test("10 change produces: quarters: 0, dimes: 1, nickels: 0, pennies: 0.", function() {
  let test = new ChangeHandler(0);
  test.insertCoin("dime");
  expect(test.giveChange()).toEqual({
    quarters: 0,
    dimes: 1,
    nickels: 0,
    pennies: 0
  });
});
test("27 change produces: quarters: 1, dimes: 0, nickels: 0, pennies: 2.", function() {
  let test = new ChangeHandler(0);
  test.insertCoin("quarter");
  test.insertCoin("penny");
  test.insertCoin("penny");
  expect(test.giveChange()).toEqual({
    quarters: 1,
    dimes: 0,
    nickels: 0,
    pennies: 2
  });
});
test("68 change produces: quarters: 2, dimes: 1, nickels: 1, pennies: 3.", function() {
  let test = new ChangeHandler(0);
  test.insertCoin("quarter");
  test.insertCoin("quarter");
  test.insertCoin("dime");
  test.insertCoin("nickel");
  test.insertCoin("penny");
  test.insertCoin("penny");
  test.insertCoin("penny");
  expect(test.giveChange()).toEqual({
    quarters: 2,
    dimes: 1,
    nickels: 1,
    pennies: 3
  });
});
