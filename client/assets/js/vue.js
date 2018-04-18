new Vue({
  el: '#container',
  data: {
    email: '',
    password: '',
    emailLogin: '',
    passwordLogin: '',
    items: [],
    cart: [],
    provinces: [],
    selectedProvince: '',
    cities: [],
    selectedCity: '',
    total: 0,
    weightTotal: 0,
    ongkir: 0,
    courier: '',
    listJenisPengiriman: [],
    selectedJenisPengiriman: '',
    noLogin: false,
    isLogin: true
  },
  methods: {
    register: function() {
       axios.post('http://35.187.252.201/register', {
        email: this.email,
        password: this.password
      })
        .then(response => {
          console.log(response);
          alert(`Email ${this.email} successfully registered!`)
          this.email = '',
          this.password = ''
        })
        .catch(err => {
          console.error(err);
        })
    },
    login: function() {
      axios.post('http://35.187.252.201/login', {
        email: this.emailLogin,
        password: this.passwordLogin
      })
        .then(response => {
          console.log(response);
          sessionStorage.setItem("token", response.data.token);
          console.log("ini session--", sessionStorage.getItem("token"))
          alert(`Login success!`)
          this.emailLogin = ''
          this.passwordLogin = ''
          this.isLogin = false
          this.noLogin = true
        })
        .catch(err => {
          alert(`Login failed!`)
          console.error(err);
        })
    },
    logout: function() {
      sessionStorage.removeItem("token");
      this.isLogin = true
      this.noLogin = false
      this.cart = []
      this.weightTotal = 0
      this.total = 0
      this.ongkir = 0
      alert('logged out')
    },
    getJenisPengiriman: function() {
      console.log("weight: ", this.weightTotal)
      console.log("city: ", this.selectedCity)
      console.log("courier", this.courier)

      axios.post('http://35.187.252.201/ongkir/price', {
        email: this.emailLogin,
        password: this.passwordLogin
      })
        .then(response => {
          console.log(response);
          sessionStorage.setItem("token", response.data.token);
          console.log("ini session--", sessionStorage.getItem("token"))
          alert(`Login success!`)
          this.emailLogin = ''
          this.passwordLogin = ''
          this.isLogin = false
          this.noLogin = true
        })
        .catch(err => {
          alert(`Login failed!`)
          console.error(err);
        })
    },
    findAllItem: function() {
      axios.get('http://35.187.252.201/item')
        .then(response => {
          this.items = response.data.data
          console.log(this.items);
        })
        .catch(err => {
          console.log(err)
        })
    },
    findItemByCategory: function(categoryId) {
      axios.get(`http://35.187.252.201/item/by_category/${categoryId}`)
        .then(response => {
          this.items = response.data.data
          console.log(this.items);
        })
        .catch(err => {
          console.error(err);
        })
    },
    findAllProvince: function() {
      axios.get(`http://35.187.252.201/ongkir/province`)
        .then(response => {
          this.provinces = response.data.data.rajaongkir.results
          console.log("province", this.provinces);
        })
        .catch(err => {
          console.error(err);
        })
    },
    findCityByProvince: function() {
      axios.get(`http://35.187.252.201/ongkir/city/${this.selectedProvince}`)
        .then(response => {
          this.cities = response.data.data.rajaongkir.results
          console.log("cities", this.cities);
        })
        .catch(err => {
          console.error(err);
        })
    },
    addToCart: function(itemObj) {
      let exist = false
      this.cart.forEach(item => {
        if (itemObj._id === item._id) {
          exist = true
          item.amount = (item.amount + 1)
          this.total += itemObj.price
          this.weightTotal += itemObj.weight
          this.total += this.ongkir
        }
      })
      if (!exist) {
        this.cart.push({
          amount: 1,
          ...itemObj
        })
        this.total += itemObj.price
        this.weightTotal += itemObj.weight
        this.total += this.ongkir
      }
    },
    remove: function(itemObj) {
      let indexItem = -1
      this.cart.forEach((item, index) => {
        if (itemObj._id === item._id) {
          indexItem = index
          this.total -= (item.price * item.amount)
          this.weightTotal -= (item.amount * item.weight)
        }
      })
      this.cart.splice(indexItem, 1)
    },
    editTotal: function(itemObj) {
      this.total = 0;
      this.weightTotal = 0;
      this.cart.forEach((item) => {
        this.total += (item.price * item.amount)
        this.weightTotal += (item.amount * item.weight)
      })
      this.total += this.ongkir
    },
    getOngkir: function() {
      console.log("masuk")
      console.log("selected city: ", parseInt(this.selectedCity))
      console.log("weight total: ", this.weightTotal)
      console.log("courier", this.courier)
      axios.post('http://35.187.252.201/ongkir/price', {
        destination: parseInt(this.selectedCity),
        weight: this.weightTotal,
        courier: this.courier
      })
        .then(response => {
          this.listJenisPengiriman = response.data.data
        })
        .catch(err => {
          console.error("error");
        })
    },
    buyItem: function() {
      console.log("ini session--", sessionStorage.getItem("token"))
      console.log("weight: ", this.weightTotal)
      console.log("province: ", this.selectedProvince)
      console.log("city: ", this.selectedCity)
      console.log("courier", this.courier)
      console.log("jenis pengiriman: ", this.selectedJenisPengiriman)
      console.log("total: ", this.total)
      console.log("item: ", this.cart)
      let itemsId = []
      this.cart.forEach(item => {
        for(let i = 0; i < item.amount; i++) {
          itemsId.push(item._id)
        }
        console.log("itemsId-", itemsId)
      })
      
      axios.post('http://35.187.252.201/transaction', {
          weight: this.weightTotal,
          province_id: this.selectedProvince,
          city_id: this.selectedCity,
          courier: this.courier,
          jenisPengiriman: this.selectedJenisPengiriman,
          total: this.total,
          item: itemsId
      }, {
        headers: {
          token: sessionStorage.getItem("token")
        }
      })
        .then(response => {
          console.log(response);
          this.cart = ''
          this.provinces = ''
          this.selectedProvince = ''
          this.cities = ''
          this.selectedCity = ''
          this.total = '',
          this.weightTotal = ''
          this.ongkir = ''
          this.courier = ''
          this.listJenisPengiriman = ''
          this.selectedJenisPengiriman = ''
          alert(`transaction success!`)

        })
        .catch(err => {
          console.error(err);
          alert(`Checkout failed!`)
        })
    }
  },
  watch: {
    selectedJenisPengiriman: function (val) {
      console.log("val", val.cost[0].value)
      this.ongkir = val.cost[0].value
    }
  },
  created: function() {
    this.findAllItem()
    this.findAllProvince()
    console.log("ini session awal--", sessionStorage.getItem("token"))
  },
  mounted: function() {
    console.log("mounted:",sessionStorage.getItem("token"))
    let token = sessionStorage.getItem("token")
    if(token) {
      this.isLogin = false
      this.noLogin = true
    }
  }
})