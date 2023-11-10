/* eslint-disable max-lines-per-function */
import Calculate from '../src/Model/Calculate';

describe('Calculate 클래스 unit 테스트', () => {
  test('총 혜택금액을 합산한 결과 반환', () => {
    const benefitData = [
      { name: '크리스마스 디데이 할인', result: -2500 },
      { name: '특별 할인', result: -1000 },
      { name: '증정 이벤트', result: -25000 },
    ];

    const calculate = new Calculate(benefitData);
    const result = calculate.totalBenefits();

    expect(result).toBe(-28500);
  });

  test('증정금액을 제외한 총 할인금액 계산결과 반환', () => {
    const isFree = { result: 25000 };

    const calculate = new Calculate();
    calculate.totalBenefit = -48000;

    const result = calculate.expectedTotal(isFree);

    expect(result).toBe(-23000);
  });
});
