# Thai Baht Text

A TypeScript library for converting numbers to Thai text representation for currency amounts, supporting Thai Baht and other monetary units.

## Features

- แปลงตัวเลขเป็นข้อความภาษาไทย (เช่น 121.50 → "หนึ่งร้อยยี่สิบเอ็ดบาทห้าสิบสตางค์")
- รองรับหน่วยต่างๆ (บาท ล้านบาท พันล้านบาท ล้านล้านบาท)
- การใช้ "เอ็ด"
- รองรับจำนวนติดลบ
- กำหนดทศนิยมได้สำหรับหน่วยที่ไม่ใช่บาท
- เพิ่มคำว่า "ถ้วน" ได้

## Installation

```bash
npm install thai-baht-text
```

## Usage

### การใช้งานพื้นฐาน

```typescript
import { thaiBahtText, ThaiBahtTextUtil } from 'thai-baht-text';

// ใช้ฟังก์ชัน utility
console.log(thaiBahtText(121.50)); // "หนึ่งร้อยยี่สิบเอ็ดบาทห้าสิบสตางค์"

// ใช้ static method ของ class
console.log(ThaiBahtTextUtil.thaiBahtText(121.50)); // "หนึ่งร้อยยี่สิบเอ็ดบาทห้าสิบสตางค์"
```

### Number Prototype Extension (ไม่บังคับ)

หากต้องการใช้ method กับ Number objects โดยตรง:

```typescript
import { registerNumberPrototype } from 'thai-baht-text';

// ลงทะเบียน prototype extension
registerNumberPrototype();

// ตอนนี้สามารถใช้ method กับตัวเลขโดยตรงได้
console.log((121.50).thaiBahtText()); // "หนึ่งร้อยยี่สิบเอ็ดบาทห้าสิบสตางค์"
```

### การใช้งานขั้นสูง

```typescript
import { ThaiBahtTextUtil, Unit } from 'thai-baht-text';

// ใช้ options object
const options = {
  unit: Unit.Million,
  decimalPlaces: 2,
  appendBahtOnly: false
};

console.log(ThaiBahtTextUtil.thaiBahtText(12.5, options)); // "สิบสองจุดห้าล้านบาท"

// ใช้ parameters แยก
console.log(ThaiBahtTextUtil.thaiBahtText(
  101, 
  Unit.Baht, 
  2, 
  true
)); // "หนึ่งร้อยหนึ่งบาทถ้วน"
```

### การใช้จำนวนทศนิยม (decimalPlaces)

#### สำหรับหน่วยบาท
- **ใช้ทศนิยม 2 ตำแหน่งเสมอ** (แสดงเป็นสตางค์)
- พารามิเตอร์ `decimalPlaces` ไม่มีผลกับหน่วยบาท

```typescript
// หน่วยบาท - ทศนิยมคือสตางค์
thaiBahtText(12.34); // "สิบสองบาทสามสิบสี่สตางค์"
thaiBahtText(12.34, Unit.Baht, 5); // "สิบสองบาทสามสิบสี่สตางค์" (ยังคง 2 ทศนิยม)
```

#### สำหรับหน่วยอื่น (ล้าน/พันล้าน/ล้านล้าน)
- กำหนดจำนวนทศนิยมได้ตามต้องการ (1-6 ตำแหน่ง)
- แสดงเป็น "จุด" ตามด้วยตัวเลขภาษาไทย

```typescript
// ล้านบาท - ทศนิยมต่างๆ
thaiBahtText(12345600, Unit.Million, 1, false); // "สิบสองจุดสามล้านบาท"
thaiBahtText(12345600, Unit.Million, 2, false); // "สิบสองจุดสามห้าล้านบาท" 
thaiBahtText(12345600, Unit.Million, 4, false); // "สิบสองจุดสามสี่ห้าหกล้านบาท"

// พันล้านบาท
thaiBahtText(5500000000, Unit.Billion, 1, false); // "ห้าจุดห้าพันล้านบาท"
thaiBahtText(5500000000, Unit.Billion, 2, false); // "ห้าจุดห้าศูนย์พันล้านบาท"

// ล้านล้านบาท
thaiBahtText(3250000000000, Unit.Trillion, 3, false); // "สามจุดสองห้าศูนย์ล้านล้านบาท"
```

#### เมื่อไหร่ควรใช้ทศนิยม
- **หน่วยล้าน**: เมื่อต้องการแสดงจำนวนเงินให้ละเอียดมากขึ้น
- **หน่วยพันล้าน**: สำหรับตัวเลขขนาดใหญ่ที่ต้องการความแม่นยำ
- **หน่วยล้านล้าน**: สำหรับตัวเลขมหาศาล เช่น งบประมาณประเทศ

```typescript
// ตัวอย่างการใช้งานจริง
const budget = 2500000000; // งบ 2.5 พันล้าน

// แสดงแบบไม่มีทศนิยม
thaiBahtText(budget, Unit.Billion, 0, false); // "สองจุดห้าพันล้านบาท"

// แสดงแบบมีทศนิยม 1 ตำแหน่ง  
thaiBahtText(budget, Unit.Billion, 1, false); // "สองจุดห้าพันล้านบาท"

// แสดงแบบมีทศนิยม 2 ตำแหน่ง
thaiBahtText(budget, Unit.Billion, 2, false); // "สองจุดห้าศูนย์พันล้านบาท"
```

## API Reference

### Enums

#### Unit (หน่วย)
- `Baht` (0): บาท
- `Million` (1): ล้านบาท
- `Billion` (2): พันล้านบาท  
- `Trillion` (3): ล้านล้านบาท

### Functions

#### `thaiBahtText(amount, options?)`
#### `thaiBahtText(amount, unit?, decimalPlaces?, appendBahtOnly?)`

แปลงตัวเลขเป็นข้อความภาษาไทย

**Parameters:**
- `amount`: `number | null | undefined` - จำนวนเงินที่ต้องการแปลง
- `options`: `Partial<ThaiBahtTextOptions>` - ตัวเลือกการตั้งค่า (ไม่บังคับ)
- `unit`: `Unit` - หน่วยของเงิน (ค่าเริ่มต้น: `Unit.Baht`)
- `decimalPlaces`: `number` - จำนวนทศนิยมสำหรับหน่วยที่ไม่ใช่บาท (ค่าเริ่มต้น: 2)
- `appendBahtOnly`: `boolean` - เพิ่มคำว่า "ถ้วน" หรือไม่ (ค่าเริ่มต้น: true)

**Returns:** `string` - ข้อความภาษาไทย

#### `ThaiBahtTextUtil.thaiBahtText(...)`

Static method ที่มี signature เหมือนกับฟังก์ชันหลัก

#### `registerNumberPrototype()`

ลงทะเบียน Number prototype extension เพื่อใช้ method กับตัวเลขโดยตรง

#### `Number.prototype.thaiBahtText(...)`

Extension method สำหรับ Number objects (ต้องเรียก `registerNumberPrototype()` ก่อน)

### Constants

- `ThaiBahtTextUtil.MAX_VALUE`: ค่าสูงสุดที่รองรับ (999,999,999,999.99)
- `ThaiBahtTextUtil.MIN_VALUE`: ค่าต่ำสุดที่รองรับ (-999,999,999,999.99)

## ตัวอย่างการใช้งาน

```typescript
// ตัวเลขพื้นฐาน
console.log(thaiBahtText(1)); // "หนึ่งบาทถ้วน"
console.log(thaiBahtText(25)); // "ยี่สิบห้าบาทถ้วน"

// จำนวนทศนิยม
console.log(thaiBahtText(12.34)); // "สิบสองบาทสามสิบสี่สตางค์"

// จำนวนติดลบ
console.log(thaiBahtText(-50.25)); // "ลบห้าสิบบาทยี่สิบห้าสตางค์"

// จำนวนมาก
console.log(thaiBahtText(1234567)); // "หนึ่งล้านสองแสนสามหมื่นสี่พันห้าร้อยหกสิบเจ็ดบาทถ้วน"

// หน่วยต่างๆ
console.log(thaiBahtText(12.5, Unit.Million)); // "สิบสองจุดห้าล้านบาทถ้วน"

// ตัวเลขที่มี 1 ที่หลักหน่วย (การใช้ "เอ็ด" ที่ถูกต้อง)
console.log(thaiBahtText(101)); // "หนึ่งร้อยหนึ่งบาทถ้วน" (ใช้ "หนึ่ง" ไม่ใช่ "เอ็ด")
console.log(thaiBahtText(21)); // "ยี่สิบเอ็ดบาทถ้วน" (ใช้ "เอ็ด" เฉพาะหลักสิบ)
```

## Testing

```bash
npm test
```

For test coverage:
```bash
npm run test:coverage
```

## Building

```bash
npm run build
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.