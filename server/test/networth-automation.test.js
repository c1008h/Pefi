const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const {
  createMonthlyNetworth
} = require('./networthService'); // Replace with the correct file path

const { User, Networth } = require('../models/index')

describe('Networth Automation', () => {
  describe('createMonthlyNetworth', () => {
    it('should create a new YearlyNetworth document if it does not exist', async () => {
      // Mock YearlyNetworth.findOne to return null
      const findOneStub = sinon.stub(Networth, 'findOne').resolves(null);

      // Call the function
      await createMonthlyNetworth();

      // Assertions
      // Ensure YearlyNetworth.findOne was called
      expect(findOneStub.calledOnce).to.be.true;

      // Restore the stub
      findOneStub.restore();
    });

    it('should create a new Monthly Networth data if it does not exist', async () => {
      // Mock YearlyNetworth.findOne to return an existing document
      const existingYearlyNetworth = new Networth({
        year: new Date().getFullYear(),
        monthlyData: [],
      });
      const findOneStub = sinon.stub(Networth, 'findOne').resolves(existingYearlyNetworth);

      // Mock YearlyNetworth.save to resolve successfully
      const saveStub = sinon.stub(existingYearlyNetworth, 'save').resolves(existingYearlyNetworth);

      // Call the function
      await createMonthlyNetworth();

      // Assertions
      // Ensure YearlyNetworth.findOne was called
      expect(findOneStub.calledOnce).to.be.true;
      
      // Ensure YearlyNetworth.save was called
      expect(saveStub.calledOnce).to.be.true;

      // Restore the stubs
      findOneStub.restore();
      saveStub.restore();
    });
  });
});
