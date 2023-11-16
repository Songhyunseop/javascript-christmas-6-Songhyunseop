/* eslint-disable max-lines-per-function */
import { BADGE } from '../src/Constant/Benefit';
import Benefits from '../src/Model/Benefit';

describe('Benefit 클래스 unit 테스트', () => {
  test('총 혜택금액을 합산한 결과 반환', () => {
    const benefitData = [
      { name: '크리스마스 디데이 할인', benefit: -2500 },
      { name: '특별 할인', benefit: -1000 },
      { name: '증정 이벤트', benefit: -25000 },
    ];

    const benefit = new Benefits(benefitData);
    const result = benefit.total(); // 적용 혜택금액 합산

    expect(result).toBe(-28500);
  });

  test('증정금액을 제외한 총 할인금액 계산결과 반환', () => {
    const benefitData = [
      { name: '크리스마스 이벤트', benefit: -15000 },
      { name: '증정이벤트', benefit: -25000 },
    ];
    const freeGift = benefitData[1];

    const benefit = new Benefits(benefitData);
    benefit.total(); // 적용 혜택금액 합산

    const result = benefit.exceptGift(freeGift);

    expect(result).toBe(-15000);
  });

  describe('각 혜택금액에 따른 뱃지 부여', () => {
    test.each([
      [21000, BADGE.SANTA],
      [11000, BADGE.TREE],
      [6000, BADGE.STAR],
    ])(
      '혜택금액에 따라 지급할 뱃지가 있는 경우',
      (totalBenefit, expectedBadge) => {
        const benefitData = [
          { name: '크리스마스 이벤트', benefit: totalBenefit },
        ];
        const benefit = new Benefits(benefitData);
        benefit.total(); // 적용 혜택금액 합산

        const result = benefit.returnBadge();

        expect(result).toBe(expectedBadge);
      }
    );

    test.each([
      [3000, BADGE.NOTHING],
      [0, BADGE.NOTHING],
    ])('혜택금액에 따라 지급할 뱃지가 없는 경우', (totalBenefit, expected) => {
      const benefitData = [
        { name: '크리스마스 이벤트', benefit: totalBenefit },
      ];
      const benefit = new Benefits(benefitData);
      benefit.total();

      const result = benefit.returnBadge();

      expect(result).toBe(expected);
    });
  });
});
