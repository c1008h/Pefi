const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const {
    createMonthlyNetworth
} = require('../utils/networthService'); 

const { User, Networth } = require('../models/index')

describe('Networth Automation', function () {
    this.timeout(5000); 

  describe('createMonthlyNetworth', () => {
    it('should create a new YearlyNetworth document if it does not exist', async () => {
      const findOneStub = sinon.stub(Networth, 'findOne').resolves(null);

      createMonthlyNetworth()
      .then(() => {
        expect(findOneStub.calledOnce).to.be.true;

        findOneStub.restore();
        done(); 
      })
      .catch((err) => done(err));

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

        createMonthlyNetworth()
        .then(() => {
            expect(findOneStub.calledOnce).to.be.true;
            expect(saveStub.calledOnce).to.be.true;

            findOneStub.restore();
            saveStub.restore();
            done();
        })
        .catch((err) => done(err))
    });
  });
  
  afterEach(() => {
    sinon.restore();
  })
});
