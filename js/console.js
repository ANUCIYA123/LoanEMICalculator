const readline = require("readline");

class LoanEMICalculator {
  constructor(principal, annualRate, years) {
    this.principal = principal;
    this.annualRate = annualRate;
    this.years = years;
  }

  isValid() {
    return (
      !isNaN(this.principal) && this.principal > 0 &&
      !isNaN(this.annualRate) && this.annualRate > 0 &&
      !isNaN(this.years) && this.years > 0);
  }

  calculateEMI() {
    const r = this.annualRate / 12 / 100;
    const n = this.years * 12;

    const emi = this.principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - this.principal;

    return {emi,totalPayment,totalInterest,months: n};
  }

  printSummary() {
    const result = this.calculateEMI();

    console.log(" Loan EMI Summary");
    console.log("Principal Amount: ₹" + this.principal.toFixed(2));
    console.log("Interest Rate: " + this.annualRate + "%");
    console.log("Loan Tenure: " + this.years + " years (" + result.months + " months)");
    console.log("Monthly EMI: ₹" + result.emi.toFixed(2));
    console.log("Total Payment: ₹" + result.totalPayment.toFixed(2));
    console.log("Total Interest: ₹" + result.totalInterest.toFixed(2));
  }
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


    rl.question("Enter Loan Amount (₹): ", function (p) {
    rl.question("Enter Annual Interest Rate (%): ", function (r) {
    rl.question("Enter Loan Tenure (in years): ", function (y) {
      var principal = parseFloat(p);
      var rate = parseFloat(r);
      var years = parseInt(y);

      var loan = new LoanEMICalculator(principal, rate, years);

      if (loan.isValid()) {
        loan.printSummary();
      } else {
        console.log("Invalid input. Please enter positive numeric values.");
      }

      rl.close(); 
    });
  });
});
