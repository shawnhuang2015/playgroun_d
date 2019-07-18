function Promise2(fn) {
  var value = null;
  var callbacks = [];
  var state = 'pending';
  var _this = this;

  this.then = function(fulfilled, rejected) {
    return new Promise2(function(resolv, rejec) {
      try {
        if (state == 'pending') {
          callbacks.push(fulfilled);
          return;
        }
        if (state == 'fulfilled') {
          var data = fulfilled(value);
          resolv(data);
          return;
        }
        if (state == 'rejected') {
          var data = rejected(value);
          resolv(data);
          return;
        }
      } catch (e) {
        _this.catch(e);
      }
    });
  };

  function resolve(valueNew) {
    value = valueNew;
    state = 'fulfilled';
    execute();
  }

  function reject(valueNew) {
    value = valueNew;
    state = 'rejected';
    execute();
  }

  function execute() {
    setTimeout(function() {
      callbacks.forEach(function(cb) {
        value = cb(value);
      });
    }, 0);
  }

  this.catch = function(e) {
    console.log(JSON.stringify(e));
  };

  fn(resolve, reject);
}

function Promise3(init) {
  this.status = 'pending';

  let resolve = (v) => {
    this.v = v;
    this.status = 'resolved';
  };

  init(resolve);

  Promise3.prototype.then = function(callback) {
    let next = (res) => {};
    let r;

    let ref = setInterval(() => {
      if (this.status === 'resolved') {
        clearInterval(ref);
        r = callback(this.v);
        ref = undefined;
      } else {
        // waiting;
      }
    });

    return new Promise3((res) => {
      let ref_ = setInterval(() => {
        if (ref === undefined) {
          res(r);
          clearInterval(ref_);
        }
      });
    });
  };
}

const PENDING = 0;
const RESOLVED = 1;
const REJECTED = 2;

function Promise4(fn) {
  this.status = PENDING;
  this.value;

  let resolve = (v) => {
    if (v instanceof Promise4) {
      v.then((v_) => {
        this.status = RESOLVED;
        this.value = v_;
      });
    } else {
      this.status = RESOLVED;
      this.value = v;
    }
  };

  Promise4.prototype.then = function(callback) {
    return new Promise4((res) => {
      let ref = setInterval(() => {
        if (this.status === RESOLVED) {
          res(callback(this.value));
          clearInterval(ref);
        }
      });
    });
  };

  fn(resolve);
}

// test single then, resolve immediately
const p = new Promise4((resolve) => resolve(10)).then((value) =>
  console.log('[test 1]', value)
);

// test single then, resolve after 2 s
const p2 = new Promise4((resolve) => {
  setTimeout(() => resolve(5), 2000);
}).then((value) => console.log('[test 2] one:', value));

// test chained then's
let p3 = p2
  .then(
    (value) =>
      new Promise4((resolve) => {
        console.log('[test 3] two:', value);

        // resolve nested promise after 3 s
        setTimeout(() => resolve(40), 3000);
      })
  )
  .then((value) => console.log('[test 4] three:', value));

// console.log(p3);
// p3.then((v) => console.log(1, v));
// p3.then((v) => console.log(2, v));
// p3.then((v) => console.log(3, v));
// p3.then((v) => console.log(4, v));
