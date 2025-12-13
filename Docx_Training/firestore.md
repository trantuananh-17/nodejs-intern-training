# Firestore

# Cấu trúc

- collection(${tên collec}): chỉ định cho 1 bảng chứa nhiều bản ghi

# Thêm bản ghi

- add: Tự sinh id cho document, thêm data vào doc
- doc(id).set(data): cho phép gán id cụ thể cho doc
- Có thể bỏ trống doc() để firestore tự sinh id -> dùng trong transaction

# lấy dữ liệu

- get(): lấy tất cả dữ liệu nhưng cần dùng forEach để lấy data sạch nhất

* ví dụ :
  const snapshot = await db.collection("users").get();
  snapshot.forEach(doc => console.log(doc.id, doc.data()));

- .doc(id).get(): lấy dữ liệu với id chỉ định

* ví dụ:
  const doc = await db.collection("users").doc("abc123").get();
  console.log(doc.data());

# Sửa dữ liệu

- update: thêm field mới khi truyền vào update field chưa tồn tại của doc
- Chỉ update field truyền vào. Các field khác giữ nguyên
- Không tự động xóa field

* ví dụ:

```
  await db.collection("users").doc("abc123").update({
    age: 30
  });
```

- ví dụ khi muốn xóa field đó ra khỏi doc:

```
  await db.collection("users").doc("abc123").update({
    address: admin.firestore.FieldValue.delete()
  });
```

# Xóa dữ liệu

- .doc(id).delete(): xóa bản ghi với id truyền vào

```
  import admin from "firebase-admin";

  await db.collection("users").doc("abc123").update({
    address: admin.firestore.FieldValue.delete()
  });
```

- recursiveDelete(collection): Xóa toàn bộ dữ liệu

```
  await db.recursiveDelete(db.collection("users"));
```

# Toán tử

- == : bằng
- > : nhỏ
- < : lớn
  .......
- in: trong danh sách
- not-in: không trong danh sách
- array-contains: mảng chứa
- array-contains-any: mảng chứa bất kỳ

-> dùng trong where:

```
  .where("age", "==", 18)
```

# pagination

- orderBy: sắp xếp
- limit: lấy số bản ghi
- offset: sô bản bị skip -> ít dùng do tốn bộ nhớ
- .startAfter(lastDoc): lấy số bản ghi theo limit tính từ bản ghi cuối cùng trước đó ( dùng từ page thứ 2)

* ví dụ lấy page 1:

```
  const page1 = await db.collection("users")
    .orderBy("age")
    .limit(10)
    .get();
```

- ví dụ lấy từ page 2:

```
  const lastDoc = page1.docs[(page - 1) * limit];

  const page2 = await db.collection("users")
    .orderBy("age")
    .startAfter(lastDoc)
    .limit(10)
    .get();
```

# Aggregate Queries

## Count()

- Lấy tổng bản ghi dữ liệu

```
  const totalUsers = await db
    .collection("users")
    .count()
    .get();

  console.log(totalUsers.data().count);
```

## Sum(field)

- Tính tổng 1 field

```
  const totalRevenue = await db
    .collection("orders")
    .sum("price")
    .get();

  console.log(totalRevenue.data().sum);
```

# Array

## arrayUnion()

- Nếu đã tồn tại -> không thêm
- Nếu chưa có -> thêm vào cuối mảng

```
  await db.collection("users").doc("abc").update({
    tags: admin.firestore.FieldValue.arrayUnion("vip")
  });
```

## arrayRemove()

- Nếu có xóa phần tử đó, không có thì không làm gì

## array-contains

- Lấy tất cả user có "vip" trong tags.

```
  const users = await db.collection("users")
    .where("tags", "array-contains", "vip")
    .get();
```

## array-contains-any

- Nếu doc có 1 trong 2 (vip hoặc pro) → nhận doc.

```
  .where("tags", "array-contains-any", ["vip", "pro"])
```

# Transaction

- Transaction đảm bảo tất cả các thao tác (read/write) phải thành công
- Nếu thành công → Firestore commit toàn bộ cùng lúc (atomic)
- Nếu có lỗi trong transaction: Firestore roll back toàn bộ thay đổi
- Firestore có thể tự retry transaction nếu xảy ra xung đột dữ liệu

* VÍ dụ transaction:

```
async function createProductWithVariantsAndAttributes(data) {
  const productRef = db.collection("products").doc(); // auto-id

  const variantRefs = data.variants.map(() =>
    productRef.collection("variants").doc()
  );

  const attributeRefs = data.attributes.map(() =>
    productRef.collection("attributes").doc()
  );

  return await db.runTransaction(async (t) => {
    // 1. Tạo product
    t.set(productRef, {
      name: data.name,
      price: data.price,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // 2. Tạo variants
    data.variants.forEach((variant, i) => {
      t.set(variantRefs[i], {
        ...variant,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    // 3. Tạo attributes
    data.attributes.forEach((attr, i) => {
      t.set(attributeRefs[i], {
        ...attr,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    // transaction commit → Firestore tự làm
    return { productId: productRef.id };
  });
}
```

# Update && delete many

- Update many

```
  const snapshot = await db.collection("users")
    .where("age", ">", 20)
    .get();

  const batch = db.batch();

  snapshot.forEach(doc => {
    batch.update(doc.ref, { role: "admin" });
  });

  await batch.commit();
```

- Delete many:

```
  const snapshot = await db.collection("users")
    .where("status", "==", "inactive")
    .get();

  const batch = db.batch();

  snapshot.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
```
