import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'Reactoffline.db';
const database_version = '3.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;

import moment from 'moment'; // 2.20.1
const _format = 'YYYY-MM-DD';

export default class Database {
  initDB() {
    return new Promise((resolve) => {
      console.log('Plugin integrity check ...');

      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed ...');
          console.log('Opening database ...');
          // this.closeDatabase(db);
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then((DB) => {
              let db;
              db = DB;

              console.log('Database OPEN');
              db.executeSql('SELECT 1 FROM cart LIMIT 1')
                .then(() => {
                  console.log('Database is ready ... executing query ...');
                })
                .catch((error) => {
                  console.log('Received error: ', error);
                  console.log('Database not yet ready ... populating data');
                  db.transaction((tx) => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS [cart] ([cId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [pId] NVARCHAR(50) NULL,[pName] NVARCHAR(255) NULL,[pDescription] NVARCHAR(255) NULL,[pPrice] NVARCHAR(255) NULL,[pOnePrice] NVARCHAR(255) NULL,[pQty] INTEGER NOT NULL,[pImage] NVARCHAR(1000) NULL,[pExtra] NVARCHAR(500) NULL,[pSize] NVARCHAR(255) NULL, [pStatus] INTEGER NOT NULL)',
                    );
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS [topins] ([tId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [pId] NVARCHAR(50) NULL,[pSize] NVARCHAR(50) NULL, [pFcream] NVARCHAR(50) NULL, [pSkim]  NVARCHAR(50) NULL, [pSoy] NVARCHAR(50) NULL, [pAlmond]  NVARCHAR(50) NULL, [pOat]  NVARCHAR(50) NULL, [cId] INTEGER NOT NULL)',
                    );
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS [cart_boxes] ([cId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [bCategory] INTEGER NOT NULL, [bId] NVARCHAR(50) NULL,[bTitle] NVARCHAR(255) NULL,[bDescription] NVARCHAR(255) NULL,[bOnePrice] NVARCHAR(255) NULL,[bPrice] NVARCHAR(255) NULL,[bQty] INTEGER NOT NULL,[bImage] NVARCHAR(1000) NULL, [bStatus] INTEGER NOT NULL)',
                    );
                  })
                    .then(() => {
                      console.log('Table created successfully');
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log('echoTest failed - plugin not functional');
        });
    });
  }

  closeDatabase(db) {
    if (db) {
      console.log('Closing DB');
      db.close()
        .then((status) => {
          console.log('Database CLOSED');
        })
        .catch((error) => {
          //  console.log(error);
          // this.errorCB(error);
        });
    } else {
      console.log('Database was not OPENED');
    }
  }
  loadDB() {
    this.initDB();
  }

  addTopins(db, data, lastId) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        let fullcream = 0,
          // (skim = 0), (soy = 0), (almond = 0), (oats = 0);
          skim = 0,
          soy = 0,
          almond = 0,
          oats = 0;

        if (data.addExtra_val[0] != null) {
          fullcream = data.addExtra_val[0].label;
        } else {
          fullcream = 0;
        }
        if (data.addExtra_val[1] != null) {
          skim = data.addExtra_val[1].label;
        } else {
          skim = 0;
        }
        if (data.addExtra_val[2] != null) {
          soy = data.addExtra_val[2].label;
        } else {
          soy = 0;
        }
        if (data.addExtra_val[3] != null) {
          almond = data.addExtra_val[3].label;
        } else {
          almond = 0;
        }
        if (data.addExtra_val[4] != null) {
          oats = data.addExtra_val[4].label;
        } else {
          oats = 0;
        }

        tx.executeSql(
          'INSERT  INTO topins (pId,pSize,pFcream,pSkim,pSoy,pAlmond,pOat,cId) VALUES ( ?,?,?,?,?,?,?,?)',
          [data.p_id, data.size, fullcream, skim, soy, almond, oats, lastId],
        ).then(([tx, results]) => {
          resolve(results);
        });
      })
        .then((results) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }

  addtocart(db, data) {
    let lastId = 0;
    // const cart_data = [];
    var SampleArray = [];
    return new Promise((resolve) => {
      db.transaction((tx) => {
        var f = '';
        var s = '';
        var so = '';
        var a = '';
        var o = '';
        let fullcream = 0,
          // (skim = 0), (soy = 0), (almond = 0), (oats = 0);
          skim = 0,
          soy = 0,
          almond = 0,
          oats = 0;

        if (data.addExtra_val[0] != null) {
          fullcream = data.addExtra_val[0].label;
          f = data.addExtra_val[0].label + ',';
          // SampleArray.push(fullcream.toString());
        } else {
          fullcream = 0;
          f = '';
        }
        if (data.addExtra_val[1] != null) {
          skim = data.addExtra_val[1].label;
          s = data.addExtra_val[1].label + ',';
        } else {
          skim = 0;
          s = '';
        }
        if (data.addExtra_val[2] != null) {
          soy = data.addExtra_val[2].label;
          so = data.addExtra_val[2].label + ',';
        } else {
          soy = 0;
          so = '';
        }
        if (data.addExtra_val[3] != null) {
          almond = data.addExtra_val[3].label;
          a = data.addExtra_val[3].label + ',';
        } else {
          almond = 0;
          a = '';
        }
        if (data.addExtra_val[4] != null) {
          oats = data.addExtra_val[4].label;
          o = data.addExtra_val[4].label + ',';
        } else {
          oats = 0;
          o = '';
        }
        var extrass = f + ' ' + s + ' ' + so + ' ' + ' ' + a + ' ' + o;

        tx.executeSql(
          'INSERT OR IGNORE  INTO cart (pId,pName,pDescription,pPrice,pOnePrice,pQty,pImage,pExtra,pSize,pStatus) VALUES ( ?,?,?,?,?,?,?,?,?,?)',
          [
            data.p_id,
            data.p_name,
            data.p_description,
            data.p_price,
            data.p_price / data.pQty,
            data.pQty,
            data.p_image,
            extrass,
            data.size,
            1,
          ],
        ).then(([tx, results]) => {
          lastId = results.insertId;

          resolve(lastId);
        });
      })
        .then((results) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }
  cart_item_exist(db, data) {
    return new Promise((resolve) => {
      let motherbag_count;
      db.transaction((tx) => {
        let fullcream = 0,
          skim = 0,
          soy = 0,
          almond = 0,
          oats = 0;

        if (data.addExtra_val[0] != null) {
          fullcream = data.addExtra_val[0].label;
        } else {
          fullcream = 0;
        }
        if (data.addExtra_val[1] != null) {
          skim = data.addExtra_val[1].label;
        } else {
          skim = 0;
        }
        if (data.addExtra_val[2] != null) {
          soy = data.addExtra_val[2].label;
        } else {
          soy = 0;
        }
        if (data.addExtra_val[3] != null) {
          almond = data.addExtra_val[3].label;
        } else {
          almond = 0;
        }
        if (data.addExtra_val[4] != null) {
          oats = data.addExtra_val[4].label;
        } else {
          oats = 0;
        }
        tx.executeSql(
          'SELECT COUNT(pId) AS p_id FROM topins WHERE pId=? AND pSize=? AND pFcream=? AND pSkim=? AND pSoy=? AND pAlmond=? AND pOat=? ',
          [data.p_id, data.size, fullcream, skim, soy, almond, oats],
        ).then(([tx, results]) => {
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            const {p_id} = row;
            motherbag_count = p_id;
          }
          resolve(motherbag_count);
        });
      })
        .then((result) => {})
        .catch((err) => {});
    });
  }
  listCartDataTest(db) {
    return new Promise((resolve) => {
      const cart_data = [];
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM topins c ORDER BY c.tId DESC ', []).then(
          ([tx, results]) => {
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);

              const {
                tId,
                pId,
                pSize,
                pFcream,
                pSkim,
                pSoy,
                pAlmond,
                pOat,
                cId,
              } = row;
              cart_data.push({
                tId,
                pId,
                pSize,
                pFcream,
                pSkim,
                pSoy,
                pAlmond,
                pOat,
                cId,
              });
            }
            resolve(cart_data);
          },
        );
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }
  
  getMinusValue(db,cid) {
    return new Promise((resolve) => {
      let cart_dataminus;
      db.transaction((tx) => {
        tx.executeSql('SELECT pQty FROM cart c WHERE c.cId=?', [cid]).then(
          ([tx, results]) => {
            var len = results.rows.length;
           
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);

              const {
              
                pQty
             
              } = row;

              cart_dataminus=pQty;
            }
            resolve(cart_dataminus);
          },
        );
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }
  listCartTopins(db) {
    return new Promise((resolve) => {
      let cart_datatop = [];
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM topins ORDER BY cId DESC', []).then(
          ([tx, results]) => {
            var len = results.rows.length;
            let cart_topins22 = [];
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);

              const {
                tId,
                pId,
                pSize,
                pFcream,
                pSkim,
                pSoy,
                pAlmond,
                pOat,
                cId,
              } = row;

              cart_datatop.push({
                tId,
                pId,
                pSize,
                pFcream,
                pSkim,
                pSoy,
                pAlmond,
                pOat,
                cId,
              });
            }
            resolve(cart_datatop);
          },
        );
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }
  listCartData(db) {
    return new Promise((resolve) => {
      const cart_data = [];
      let cart_topins = [];
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM cart c ORDER BY c.cId DESC', []).then(
          ([tx, results]) => {
            var len = results.rows.length;
            let cart_topins22 = [];
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);

              const {
                cId,
                pId,
                pName,
                pDescription,
                pPrice,
                pOnePrice,
                pStatus,
                pImage,
                pQty,
                pExtra,
                pSize,
              } = row;

              cart_data.push({
                cId,
                pId,
                pName,
                pDescription,
                pPrice,
                pOnePrice,
                pStatus,
                pImage,
                pQty,
                pExtra,
                pSize,
              });
            }
            resolve(cart_data);
          },
        );
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }
  deleteItem(db, id) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql('DELETE FROM cart WHERE cId = ?', [id]).then(
          ([tx, results]) => {
            resolve(results);
          },
        );
        tx.executeSql('DELETE FROM topins WHERE cId = ?', [id]).then(
          ([tx, results]) => {
            resolve(results);
          },
        );
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }

  deleteCartData(db) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql('DELETE FROM cart', []).then(([tx, results]) => {
          resolve(results);
        });
        tx.executeSql('DELETE FROM topins', []).then(([tx, results]) => {
          resolve(results);
        });
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }

  countMotherBag(db) {
    return new Promise((resolve) => {
      let motherbag_count;
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT COUNT(hId) AS motherbagcount FROM Hospitalbagmother WHERE hStatus="true"',
          [],
        ).then(([tx, results]) => {
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            const {motherbagcount} = row;
            motherbag_count = motherbagcount;
          }
          resolve(motherbag_count);
        });
      })
        .then((result) => {})
        .catch((err) => {});
    });
  }






  


  cartCont(db) {
    console.log("?????????????????????????????????? : "+db);
    return new Promise((resolve) => {
      let cart_count;
      db.transaction((tx) => {
        tx.executeSql('SELECT COUNT(cId) AS cartcount FROM cart', []).then(
          ([tx, results]) => {
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              const {cartcount} = row;
              cart_count = cartcount;
            }
            resolve(cart_count);
          },
        );
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }

  listCartItems(db) {
    return new Promise((resolve) => {
      const cart_item = [];
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM cart c ORDER BY c.cId DESC ', []).then(
          ([tx, results]) => {
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);

              const {
                cId,
                pId,
                pName,
                pDescription,
                pPrice,
                pOnePrice,
                pStatus,
                pImage,
                pQty,
                pExtra,
                pSize,
              } = row;
              cart_item.push({
                cId,
                pId,
                pName,
                pDescription,
                pPrice,
                pOnePrice,
                pStatus,
                pImage,
                pQty,
                pExtra,
                pSize,
              });
            }

            resolve(cart_item);
          },
        );
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }

  updateCart(db, qty, newPrice, id) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE cart SET pQty =pQty + ?,pPrice=?   WHERE pId = ?',
          [qty, newPrice, id],
        ).then(([tx, results]) => {
          resolve(results);
        });
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }

  addItemQty(db, data) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE cart SET pQty =pQty + ?,pPrice=?   WHERE cId = ? ',
          [data.pQty, data._pPrice,data.cID],
        ).then(([tx, results]) => {
          resolve(results);
        });
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }
  subItemQty(db, data) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        
          tx.executeSql(
            'UPDATE cart SET pQty =pQty - ?,pPrice=?   WHERE cId = ?',
            [data.pQty, data._pPrice, data.cID],
          ).then(([tx, results]) => {
            resolve(results);
          });
        
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }
  getItemById(db, id) {
    return new Promise((resolve) => {
      const cart_item = [];
      db.transaction((tx) => {
        tx.executeSql('SELECT cId,pId,pPrice,pQty FROM cart WHERE pId = ? ', [
          id,
        ]).then(([tx, results]) => {
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            const {cId, pId, pPrice, pQty} = row;
            cart_item.push({
              cId,
              pId,

              pPrice,

              pQty,
            });
          }

          resolve(cart_item);
        });
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }

  listCartBoxItems(db) {
    return new Promise((resolve) => {
      const cart_box_item = [];
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM cart_boxes b ORDER BY b.bId DESC ',
          [],
        ).then(([tx, results]) => {
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);

            const {
              cId,
              bId,
              bCategory,
              bTitle,
              bDescription,
              bOnePrice,
              bPrice,
              bQty,
              bImage,
              bStatus,
            } = row;
            cart_box_item.push({
              cId,
              bId,
              bCategory,
              bTitle,
              bDescription,
              bOnePrice,
              bPrice,
              bQty,
              bImage,
              bStatus,
            });
          }

          resolve(cart_box_item);
        });
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }

  addboxtocart(db, data) {
    // let lastId = 0;
    const cart_data = [];

    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT OR IGNORE  INTO cart_boxes (bId,bCategory,bTitle,bDescription,bOnePrice,bPrice,bQty,bImage,bStatus) VALUES ( ?,?,?,?,?,?,?,?,?)',
          [
            data.b_id,
            data.b_category,
            data.b_title,
            data.b_description,
            data.bOnePrice,
            data.b_price,
            data.bQty,
            data.b_image,
            1,
          ],
        ).then(([tx, results]) => {
          // lastId = results.insertId;

          resolve(results);
        });
      })
        .then((results) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }

  updateBoxCart(db, bqty, newPrice, id) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE cart_boxes SET bQty =bQty + ?,bPrice=?   WHERE bId = ?',
          [bqty, newPrice, id],
        ).then(([tx, results]) => {
          resolve(results);
        });
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }
  listBoxCartData(db) {
    return new Promise((resolve) => {
      const cart_box_data = [];

      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM cart_boxes b ORDER BY b.cId DESC',
          [],
        ).then(([tx, results]) => {
          var len = results.rows.length;

          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);

            const {
              cId,
              bId,
              bCategory,
              bTitle,
              bDescription,
              bOnePrice,
              bPrice,
              bQty,
              bImage,
              bStatus,
            } = row;
            cart_box_data.push({
              cId,
              bId,
              bCategory,
              bTitle,
              bDescription,
              bOnePrice,
              bPrice,
              bQty,
              bImage,
              bStatus,
            });
          }
          resolve(cart_box_data);
        });
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }
  deleteBoxCartItem(db, id) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql('DELETE FROM cart_boxes WHERE cId = ?', [id]).then(
          ([tx, results]) => {
            resolve(results);
          },
        );
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }
  addItemBoxQty(db, data) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE cart_boxes SET bQty =bQty + ?,bPrice=?   WHERE bId = ?',
          [data.bQty, data._pPrice, data.bId],
        ).then(([tx, results]) => {
          resolve(results);
        });
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }
  subItemBoxQty(db, data) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE cart_boxes SET bQty =bQty - ?,bPrice=?   WHERE bId = ?',
          [data.bQty, data._pPrice, data.bId],
        ).then(([tx, results]) => {
          resolve(results);
        });
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }
  deleteBoxCartData(db) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql('DELETE FROM cart_boxes', []).then(([tx, results]) => {
          resolve(results);
        });
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }


  boxcartCont(db) {
    return new Promise((resolve) => {
      let cart_count;
      db.transaction((tx) => {
        tx.executeSql('SELECT COUNT(cId) AS cartcount FROM cart_boxes', []).then(
          ([tx, results]) => {
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              const {cartcount} = row;
              cart_count = cartcount;
            }
            resolve(cart_count);
          },
        );
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }


  cartContnew(db) {
    return new Promise((resolve) => {
      let cart_countnew;
      db.transaction((tx) => {
        tx.executeSql('SELECT COUNT(cId) AS cartcount FROM cart', []).then(
          ([tx, results]) => {
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              const {cartcount} = row;
              cart_countnew = cartcount;
            }
            resolve(cart_countnew);
          },
        );
      })
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }




}
