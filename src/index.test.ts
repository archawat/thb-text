import { ThaiBahtTextUtil, thaiBahtText, Unit, registerNumberPrototype } from './index';

// Register the Number prototype extension for testing
registerNumberPrototype();

describe('ThaiBahtTextUtil', () => {
  describe('OneToTen', () => {
    it('should convert single digit numbers correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(1)).toBe("หนึ่งบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(2)).toBe("สองบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(3)).toBe("สามบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(4)).toBe("สี่บาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(5)).toBe("ห้าบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(6)).toBe("หกบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(7)).toBe("เจ็ดบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(8)).toBe("แปดบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(9)).toBe("เก้าบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(10)).toBe("สิบบาทถ้วน");
    });
  });

  describe('NullIsZero', () => {
    it('should handle null values as zero', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(null)).toBe("ศูนย์บาทถ้วน");
    });
  });

  describe('Zero', () => {
    it('should handle zero correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(0)).toBe("ศูนย์บาทถ้วน");
    });
  });

  describe('NumbersWithOne', () => {
    it('should handle numbers ending with 1 correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(11)).toBe("สิบเอ็ดบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(21)).toBe("ยี่สิบเอ็ดบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(31)).toBe("สามสิบเอ็ดบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(41)).toBe("สี่สิบเอ็ดบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(51)).toBe("ห้าสิบเอ็ดบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(61)).toBe("หกสิบเอ็ดบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(71)).toBe("เจ็ดสิบเอ็ดบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(81)).toBe("แปดสิบเอ็ดบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(91)).toBe("เก้าสิบเอ็ดบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(101)).toBe("หนึ่งร้อยหนึ่งบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(111)).toBe("หนึ่งร้อยสิบเอ็ดบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(201)).toBe("สองร้อยหนึ่งบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(5001)).toBe("ห้าพันหนึ่งบาทถ้วน");
    });
  });

  describe('SomeBigNumbers', () => {
    it('should handle large numbers correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(12345)).toBe("หนึ่งหมื่นสองพันสามร้อยสี่สิบห้าบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(12345678)).toBe("สิบสองล้านสามแสนสี่หมื่นห้าพันหกร้อยเจ็ดสิบแปดบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(675001333111)).toBe("หกแสนเจ็ดหมื่นห้าพันหนึ่งล้านสามแสนสามหมื่นสามพันหนึ่งร้อยสิบเอ็ดบาทถ้วน");
    });
  });

  describe('Satangs', () => {
    it('should handle satang amounts correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(0.05)).toBe("ห้าสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(0.10)).toBe("สิบสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(0.25)).toBe("ยี่สิบห้าสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(0.50)).toBe("ห้าสิบสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(0.75)).toBe("เจ็ดสิบห้าสตางค์");
    });
  });

  describe('BahtAndSatangs', () => {
    it('should handle baht and satang combinations correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(11.90)).toBe("สิบเอ็ดบาทเก้าสิบสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(560.83)).toBe("ห้าร้อยหกสิบบาทแปดสิบสามสตางค์");
    });
  });

  describe('NegativeAmounts', () => {
    it('should handle negative amounts correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(-1)).toBe("ลบหนึ่งบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(-11)).toBe("ลบสิบเอ็ดบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(-550.25)).toBe("ลบห้าร้อยห้าสิบบาทยี่สิบห้าสตางค์");
    });
  });

  describe('SatangRounding', () => {
    it('should use two decimal places and round away from zero', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(0.055)).toBe("หกสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(0.065)).toBe("เจ็ดสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(0.075)).toBe("แปดสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(0.071)).toBe("เจ็ดสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(0.079)).toBe("แปดสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(0.995)).toBe("หนึ่งบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(1.998)).toBe("สองบาทถ้วน");
    });
  });

  describe('NegativeRounding', () => {
    it('should handle negative rounding correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(-0.055)).toBe("ลบหกสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(-0.065)).toBe("ลบเจ็ดสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(-0.075)).toBe("ลบแปดสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(-0.071)).toBe("ลบเจ็ดสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(-0.079)).toBe("ลบแปดสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(-0.995)).toBe("ลบหนึ่งบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(-1.998)).toBe("ลบสองบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(-0.009)).toBe("ลบหนึ่งสตางค์");
    });
  });

  describe('ExtremeValues', () => {
    it('should throw error for values outside supported range', () => {
      expect(() => ThaiBahtTextUtil.thaiBahtText(1000000000000)).toThrow();
      expect(() => ThaiBahtTextUtil.thaiBahtText(-1000000000000)).toThrow();
    });
  });

  describe('MinAndMaxValues', () => {
    it('should handle min and max values correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(ThaiBahtTextUtil.MAX_VALUE)).toBe("เก้าแสนเก้าหมื่นเก้าพันเก้าร้อยเก้าสิบเก้าล้านเก้าแสนเก้าหมื่นเก้าพันเก้าร้อยเก้าสิบเก้าบาทเก้าสิบเก้าสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(ThaiBahtTextUtil.MIN_VALUE)).toBe("ลบเก้าแสนเก้าหมื่นเก้าพันเก้าร้อยเก้าสิบเก้าล้านเก้าแสนเก้าหมื่นเก้าพันเก้าร้อยเก้าสิบเก้าบาทเก้าสิบเก้าสตางค์");
    });
  });


  describe('JustMillionPart', () => {
    it('should handle million-only amounts correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(5001000000)).toBe("ห้าพันหนึ่งล้านบาทถ้วน");
    });
  });

  describe('JustMillionAndSatangParts', () => {
    it('should handle million and satang combinations correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(5001000000.11)).toBe("ห้าพันหนึ่งล้านบาทสิบเอ็ดสตางค์");
    });
  });

  describe('OneSatangHandling', () => {
    it('should handle one satang correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(0.01)).toBe("หนึ่งสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(0.01)).not.toBe("เอ็ดสตางค์");
    });
  });

  describe('TrillionAmounts', () => {
    it('should handle trillion amounts correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(25000000000)).toBe("สองหมื่นห้าพันล้านบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(250051000.25)).toBe("สองร้อยห้าสิบล้านห้าหมื่นหนึ่งพันบาทยี่สิบห้าสตางค์");
    });
  });

  describe('BahtOnly', () => {
    it('should handle appendBahtOnly option correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(11000111, Unit.Baht, 2, true)).toBe("สิบเอ็ดล้านหนึ่งร้อยสิบเอ็ดบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(11000111, Unit.Baht, 2, false)).toBe("สิบเอ็ดล้านหนึ่งร้อยสิบเอ็ดบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(50.50, Unit.Baht, 2, true)).toBe("ห้าสิบบาทห้าสิบสตางค์");
      expect(ThaiBahtTextUtil.thaiBahtText(50.50, Unit.Baht, 2, false)).toBe("ห้าสิบบาทห้าสิบสตางค์");
    });
  });

  describe('ZeroWithoutBahtOnly', () => {
    it('should handle zero without baht only suffix', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(0, Unit.Baht, 2, false)).toBe("ศูนย์บาท");
    });
  });

  describe('Unit_Million', () => {
    it('should handle million unit correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(12345600.00, Unit.Million, 2, false)).toBe("สิบสองจุดสามห้าล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(8500000, Unit.Million, 2, false)).toBe("แปดจุดห้าล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(111200000, Unit.Million, 2, false)).toBe("หนึ่งร้อยสิบเอ็ดจุดสองล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(9000000, Unit.Million, 2, false)).toBe("เก้าล้านบาท");
    });
  });

  describe('Unit_Billion', () => {
    it('should handle billion unit correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(12345600000.00, Unit.Billion, 2, false)).toBe("สิบสองจุดสามห้าพันล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(8500000000, Unit.Billion, 2, false)).toBe("แปดจุดห้าพันล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(111200000000, Unit.Billion, 2, false)).toBe("หนึ่งร้อยสิบเอ็ดจุดสองพันล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(9000000000, Unit.Billion, 2, false)).toBe("เก้าพันล้านบาท");
    });
  });

  describe('Unit_Trillion', () => {
    it('should handle trillion unit correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(12345600000000.00, Unit.Trillion, 2, false)).toBe("สิบสองจุดสามห้าล้านล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(8500000000000, Unit.Trillion, 2, false)).toBe("แปดจุดห้าล้านล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(111200000000000, Unit.Trillion, 2, false)).toBe("หนึ่งร้อยสิบเอ็ดจุดสองล้านล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(9000000000000, Unit.Trillion, 2, false)).toBe("เก้าล้านล้านบาท");
    });
  });

  describe('BigZero', () => {
    it('should handle zero for different units', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(0, Unit.Million, 2, false)).toBe("ศูนย์ล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(0, Unit.Billion, 2, false)).toBe("ศูนย์พันล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(0, Unit.Trillion, 2, false)).toBe("ศูนย์ล้านล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(5000000, Unit.Million, 2, false)).toBe("ห้าล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(5000000, Unit.Billion, 2, false)).toBe("จุดศูนย์หนึ่งพันล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(5000000, Unit.Billion, 4, false)).toBe("จุดศูนย์ศูนย์ห้าพันล้านบาท");
    });
  });

  describe('DecimalPlaces', () => {
    it('should handle different decimal places correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(12345600.00, Unit.Million, 1, false)).toBe("สิบสองจุดสามล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(8500000, Unit.Million, 1, false)).toBe("แปดจุดห้าล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(111200000, Unit.Million, 1, false)).toBe("หนึ่งร้อยสิบเอ็ดจุดสองล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(12345600.00, Unit.Million, 4, false)).toBe("สิบสองจุดสามสี่ห้าหกล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(8500000, Unit.Million, 4, false)).toBe("แปดจุดห้าล้านบาท");
      expect(ThaiBahtTextUtil.thaiBahtText(111200000, Unit.Million, 4, false)).toBe("หนึ่งร้อยสิบเอ็ดจุดสองล้านบาท");
    });
  });

  describe('NumbersWithOneLargeScale', () => {
    it('should handle large numbers with 1 correctly', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(101000101.11, Unit.Million, 2, true)).toBe("หนึ่งร้อยหนึ่งล้านบาทถ้วน");
    });
  });

  describe('DefaultBehavior', () => {
    it('should use correct default behavior', () => {
      expect(ThaiBahtTextUtil.thaiBahtText(501)).toBe("ห้าร้อยหนึ่งบาทถ้วน");
      expect(ThaiBahtTextUtil.thaiBahtText(501000000)).toBe("ห้าร้อยหนึ่งล้านบาทถ้วน");
    });
  });

  describe('Extension functions', () => {
    it('should work with standalone function', () => {
      expect(thaiBahtText(121.50)).toBe("หนึ่งร้อยยี่สิบเอ็ดบาทห้าสิบสตางค์");
      expect(thaiBahtText(null)).toBe("ศูนย์บาทถ้วน");
    });

    it('should work with Number prototype extension', () => {
      expect((121.50).thaiBahtText()).toBe("หนึ่งร้อยยี่สิบเอ็ดบาทห้าสิบสตางค์");
      expect((11.50).thaiBahtText()).toBe("สิบเอ็ดบาทห้าสิบสตางค์");
    });
  });
});