export enum Unit {
  Baht = 0,
  Million = 1,
  Billion = 2,
  Trillion = 3
}

export interface ThaiBahtTextOptions {
  unit: Unit;
  appendBahtOnly: boolean;
  decimalPlaces: number;
}

export class ThaiBahtTextUtil {
  public static readonly MAX_VALUE = 999999999999.99;
  public static readonly MIN_VALUE = -999999999999.99;

  private static readonly THAI_MILLION = "ล้าน";
  private static readonly THAI_BAHT = "บาท";
  private static readonly THAI_SATANG = "สตางค์";
  private static readonly THAI_ONE = "หนึ่ง";
  private static readonly THAI_ET = "เอ็ด";
  private static readonly THAI_NEGATION = "ลบ";
  private static readonly THAI_TEN = "สิบ";
  private static readonly THAI_TWENTY = "ยี่สิบ";
  private static readonly THAI_PERIOD = "จุด";
  private static readonly THAI_ONLY = "ถ้วน";

  private static readonly thaiPlaces = [
    "", "", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"
  ];

  private static readonly thaiNumbers = [
    "ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"
  ];

  public static thaiBahtText(
    amount: number | null | undefined,
    options?: Partial<ThaiBahtTextOptions>
  ): string;
  public static thaiBahtText(
    amount: number | null | undefined,
    unit?: Unit,
    decimalPlaces?: number,
    appendBahtOnly?: boolean
  ): string;
  public static thaiBahtText(
    amount: number | null | undefined,
    optionsOrUnit?: Partial<ThaiBahtTextOptions> | Unit,
    decimalPlaces: number = 2,
    appendBahtOnly: boolean = true
  ): string {
    const actualAmount = amount ?? 0;
    
    let actualUnit: Unit;
    let actualDecimalPlaces: number;
    let actualAppendBahtOnly: boolean;

    if (typeof optionsOrUnit === 'object' && optionsOrUnit !== null) {
      actualUnit = optionsOrUnit.unit ?? Unit.Baht;
      actualDecimalPlaces = optionsOrUnit.decimalPlaces ?? 2;
      actualAppendBahtOnly = optionsOrUnit.appendBahtOnly ?? true;
    } else {
      actualUnit = optionsOrUnit ?? Unit.Baht;
      actualDecimalPlaces = decimalPlaces;
      actualAppendBahtOnly = appendBahtOnly;
    }

    if (actualAmount === 0) {
      let result = "";
      switch (actualUnit) {
        case Unit.Baht:
          result = "ศูนย์บาท";
          break;
        case Unit.Million:
          result = "ศูนย์ล้านบาท";
          break;
        case Unit.Billion:
          result = "ศูนย์พันล้านบาท";
          break;
        case Unit.Trillion:
          result = "ศูนย์ล้านล้านบาท";
          break;
      }
      if (actualAppendBahtOnly) {
        result += this.THAI_ONLY;
      }
      return result;
    }

    const isBaht = actualUnit === Unit.Baht;
    let processedAmount = actualAmount;

    if (!isBaht) {
      switch (actualUnit) {
        case Unit.Million:
          processedAmount /= 1000000;
          break;
        case Unit.Billion:
          processedAmount /= 1000000000;
          break;
        case Unit.Trillion:
          processedAmount /= 1000000000000;
          break;
      }
      switch (actualDecimalPlaces) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        default:
          actualDecimalPlaces = 2;
          break;
      }
    } else {
      actualDecimalPlaces = 2;
    }

    // Round away from zero like .NET MidpointRounding.AwayFromZero
    const multiplier = Math.pow(10, actualDecimalPlaces);
    processedAmount = processedAmount >= 0 
      ? Math.floor(processedAmount * multiplier + 0.5) / multiplier
      : Math.ceil(processedAmount * multiplier - 0.5) / multiplier;

    if (processedAmount < this.MIN_VALUE || processedAmount > this.MAX_VALUE) {
      throw new Error("Amount out of supported range");
    }

    let result = "";
    if (processedAmount < 0) {
      result += this.THAI_NEGATION;
      processedAmount = -processedAmount;
    }

    const text = processedAmount.toFixed(actualDecimalPlaces);
    const parts = this.decompose(text);

    if (parts[0].length > 0) {
      result += this.speakTo(parts[0]);
      result += this.THAI_MILLION;
    }

    if (parts[1].length > 0) {
      result += this.speakTo(parts[1]);
      result += this.THAI_MILLION;
    }

    if (parts[2].length > 0) {
      result += this.speakTo(parts[2]);
      if (isBaht) result += this.THAI_BAHT;
    } else if (parts[1].length > 0) {
      if (isBaht) result += this.THAI_BAHT;
    }

    if (parts[3].length > 0) {
      if (isBaht) {
        result += this.speakTo(parts[3]);
        result += this.THAI_SATANG;
      } else {
        if (parseInt(parts[3]) !== 0) {
          result += this.speakDotTo(parts[3]);
        }
        switch (actualUnit) {
          case Unit.Million:
            result += "ล้านบาท";
            break;
          case Unit.Billion:
            result += "พันล้านบาท";
            break;
          case Unit.Trillion:
            result += "ล้านล้านบาท";
            break;
        }
      }
    } else {
      if (!isBaht) {
        switch (actualUnit) {
          case Unit.Million:
            result += "ล้านบาท";
            break;
          case Unit.Billion:
            result += "พันล้านบาท";
            break;
          case Unit.Trillion:
            result += "ล้านล้านบาท";
            break;
        }
      }
      if (actualAppendBahtOnly) {
        result += this.THAI_ONLY;
      }
    }

    return result;
  }

  private static decompose(text: string): string[] {
    let s1 = "";
    let s2 = "";
    let s3: string;
    let s4: string;

    const position = text.indexOf(".");
    s3 = text.substring(0, position);
    s4 = text.substring(position + 1);

    if (s4 === "00") {
      s4 = "";
    }

    let length = s3.length;
    if (length > 6) {
      s2 = s3.substring(0, length - 6);
      s3 = s3.substring(length - 6);
    }

    length = s2.length;
    if (length > 6) {
      s1 = s2.substring(0, length - 6);
      s2 = s2.substring(length - 6);
    }

    if (s3.length > 0 && parseInt(s3) === 0) {
      s3 = "";
    }

    return [s1, s2, s3, s4];
  }

  private static speakDotTo(text: string): string {
    let result = this.THAI_PERIOD;
    // Remove trailing zeros but keep internal zeros
    let trimmedText = text.replace(/0+$/, '');
    if (trimmedText === '') {
      trimmedText = '0';
    }
    
    for (let i = 0; i < trimmedText.length; i++) {
      const c = parseInt(trimmedText[i]);
      result += this.thaiNumbers[c];
    }
    return result;
  }

  private static speakTo(text: string): string {
    const length = text.length;
    let result = "";
    let lastc = -1;
    let negative = false;

    for (let i = 0; i < length; i++) {
      if (text[i] === "-") {
        negative = true;
      } else {
        const c = parseInt(text[i]);

        if (i === length - 1 && c === 1) {
          if (
            length === 1 ||
            (negative && length === 2) ||
            (length === 2 && lastc === 0)
          ) {
            result += this.THAI_ONE;
            return result;
          }
          // Use TensOnly logic: only use เอ็ด for tens place
          if (lastc === 0) {
            result += this.THAI_ONE;
          } else {
            result += this.THAI_ET;
          }
        } else if (i === length - 2 && c === 2) {
          result += this.THAI_TWENTY;
        } else if (i === length - 2 && c === 1) {
          result += this.THAI_TEN;
        } else if (c !== 0) {
          result += this.thaiNumbers[c] + this.thaiPlaces[length - i];
        }
        lastc = c;
      }
    }

    return result;
  }
}

export function thaiBahtText(
  amount: number | null | undefined,
  options?: Partial<ThaiBahtTextOptions>
): string;
export function thaiBahtText(
  amount: number | null | undefined,
  unit?: Unit,
  decimalPlaces?: number,
  appendBahtOnly?: boolean
): string;
export function thaiBahtText(
  amount: number | null | undefined,
  optionsOrUnit?: Partial<ThaiBahtTextOptions> | Unit,
  decimalPlaces?: number,
  appendBahtOnly?: boolean
): string {
  return ThaiBahtTextUtil.thaiBahtText(amount, optionsOrUnit as any, decimalPlaces, appendBahtOnly);
}

declare global {
  interface Number {
    thaiBahtText(options?: Partial<ThaiBahtTextOptions>): string;
    thaiBahtText(
      unit?: Unit,
      decimalPlaces?: number,
      appendBahtOnly?: boolean
    ): string;
  }
}

export function registerNumberPrototype(): void {
  Number.prototype.thaiBahtText = function (
    this: number,
    optionsOrUnit?: Partial<ThaiBahtTextOptions> | Unit,
    decimalPlaces?: number,
    appendBahtOnly?: boolean
  ): string {
    return ThaiBahtTextUtil.thaiBahtText(this, optionsOrUnit as any, decimalPlaces, appendBahtOnly);
  };
}