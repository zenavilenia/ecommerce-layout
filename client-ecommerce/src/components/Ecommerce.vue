<template>
  <div id="container">
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="#" v-on:click="findAllItem()">E-commerce</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
				aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="dropdown-fashion" role="button" data-toggle="dropdown" aria-haspopup="true"
							aria-expanded="false">
							Fashion
						</a>
						<div class="dropdown-menu" aria-labelledby="navbarDropdown">
							<a class="dropdown-item" href="#" v-on:click="findItemByCategory('5ad1b02831487227fea72c4d')">Fashion Pria</a>
							<a class="dropdown-item" href="#" v-on:click="findItemByCategory('5ad1b0b331487227fea72c4f')">Fashion Wanita</a>
						</div>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="dropdown-gadget" role="button" data-toggle="dropdown" aria-haspopup="true"
							aria-expanded="false">
							Gadget
						</a>
						<div class="dropdown-menu" aria-labelledby="navbarDropdown">
							<a class="dropdown-item" href="#" v-on:click="findItemByCategory('5ad1b0d131487227fea72c50')">Handphone</a>
							<a class="dropdown-item" href="#" v-on:click="findItemByCategory('5ad1b0df31487227fea72c51')">Laptop</a>
						</div>
					</li>
				</ul>
				<form class="form-inline my-2 my-lg-0 mx-auto">
					<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
				</form>
				<ul class="nav navbar-nav navbar-right">
					<!-- <ul class="nav navbar-nav flex-row justify-content-between ml-auto"> -->
					<li class="dropdown order-1" v-show="isLogin">
						<button type="button" id="btn_register" data-toggle="dropdown" class="btn btn-outline-secondary dropdown-toggle add-margin">Register
							<span class="caret"></span>
						</button>
						<ul class="dropdown-menu dropdown-menu-right mt-2">
							<li class="px-3 py-2">
								<form class="form" role="form" v-on:submit.prevent="register()">
									<div class="form-group">
										<input id="regis_email" placeholder="Email" class="form-control form-control-sm" type="email" required="" v-model="email">
									</div>
									<div class="form-group">
										<input id="regis_pwd" placeholder="Password" class="form-control form-control-sm" type="password" required="" v-model="password">
									</div>
									<div class="form-group">
										<button type="submit" class="btn btn-primary btn-block">Register</button>
									</div>
								</form>
							</li>
						</ul>
					</li>
					<!-- </ul>
					<ul class="nav navbar-nav flex-row justify-content-between ml-auto"> -->
					<li class="dropdown order-1" v-show="isLogin">
						<button type="button" id="btn_login" data-toggle="dropdown" class="btn btn-outline-secondary dropdown-toggle add-margin">Login
							<span class="caret"></span>
						</button>
						<ul class="dropdown-menu dropdown-menu-right mt-2">
							<li class="px-3 py-2">
								<form class="form" role="form" v-on:submit.prevent="login()">
									<div class="form-group">
										<input id="login_email" placeholder="Email" class="form-control form-control-sm" type="text" required="" v-model="emailLogin">
									</div>
									<div class="form-group">
										<input id="login_pwd" placeholder="Password" class="form-control form-control-sm" type="text" required="" v-model="passwordLogin">
									</div>
									<div class="form-group">
										<button type="submit" class="btn btn-primary btn-block">Login</button>
									</div>
									<div class="form-group text-center">
										<small>
											<a href="#" data-toggle="modal" data-target="#modalPassword">Forgot password?</a>
										</small>
									</div>
								</form>
							</li>
						</ul>
					</li>
					<!-- </ul>
					<ul class="nav navbar-nav flex-row justify-content-between ml-auto pointer"> -->
					<li class="dropdown order-1 pointer add-margin" v-show="noLogin">
						<i id="dropdownMenu1" data-toggle="dropdown" class="fa fa-shopping-cart vertical-align">Cart
							<span class="caret"></span>
						</i>
						<ul class="dropdown-menu dropdown-menu-right mt-2 cartSize">
							<li class="px-3 py-2">
								<div class="table-responsive">
									<table class="table">
										<thead>
											<tr>
												<th>Qty</th>
												<th>Product</th>
												<th>Weight</th>
												<th>Price</th>
												<th>Total</th>
												<th>X</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="item in cart">
												<td>
													<input id="item-amount" type="number" min="1" step="1" v-model="item.amount"
														v-on:click="editTotal()" />
												</td>
												<td>
													<img v-bind:src="item.image" height="30px" width="30px"> {{item.name}}</td>
												<td> {{item.weight*item.amount}} </td>
												<td>Rp. {{item.price}}</td>
												<td>Rp. {{item.amount*item.price}}</td>
												<td>
													<a href="#">
														<span class="glyphicon glyphicon-trash" v-on:click="remove(item)">x</span>
													</a>
												</td>
											</tr>
											<tr>
												<td></td>
												<td></td>
												<td></td>
												<td>
													<b>Weight</b>
												</td>
												<td>
													<b>{{weightTotal}} kg</b>
												</td>2
												<td></td>
											</tr>
											<tr>
												<td></td>
												<td></td>
												<td></td>
												<td>
													<b>Ongkir</b>
												</td>
												<td>
													<b>Rp. {{ongkir}}</b>
												</td>
												<td></td>
											</tr>
											<tr>
												<td></td>
												<td></td>
												<td></td>
												<td>
													<b>Total</b>
												</td>
												<td>
													<b>Rp. {{total}}</b>
												</td>
												<td></td>
											</tr>
										</tbody>
									</table>
                </div>
								<hr>
								<b>Alamat Pengiriman:</b>
								<div class="form-group">
									<select class="form-control form-control-sm" data-live-search="true" v-model="selectedProvince" v-on:click="findCityByProvince()"
										required>
										<option v-for="province in provinces" :value="province.province_id"> {{ province.province }} </option>
									</select>
								</div>
								<div class="form-group">
									<select class="form-control form-control-sm" data-live-search="true" v-model="selectedCity" required>
										<option v-for="city in cities" :value="city.city_id"> {{ city.city_name }} </option>
									</select>
								</div>
								<hr>
								<b>Kurir :</b>
								<div class="form-group">
									<select class="form-control form-control-sm" data-live-search="true" v-model="courier" v-on:click="getOngkir()"
										required>
										<option value="jne">JNE</option>
										<option value="pos">POS</option>
										<option value="tiki">TIKI</option>
									</select>
								</div>
								<b>Jenis Pengiriman :</b>
								<div class="form-group">
									<select class="form-control form-control-sm" data-live-search="true" v-model="selectedJenisPengiriman">
										<option v-for="jenisPengiriman in listJenisPengiriman" :value="jenisPengiriman"> {{ jenisPengiriman.service }} </option>
									</select>
									</div>
								<button class="btn btn-outline-primary my-2 my-sm-0 btn-right" v-on:click="buyItem()">Buy</button>
							</li>
						</ul>
					</li>
					<!-- </ul> -->
				</ul>
				<button type="button" class="btn btn-outline-secondary" v-show="noLogin" v-on:click="logout()">Logout</button>
			</div>
		</nav>

		<div id="carouselExampleIndicators" class="carousel slide slideSize" data-ride="carousel">
			<ol class="carousel-indicators">
				<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
				<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
				<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
			</ol>
			<div class="carousel-inner">
				<div class="carousel-item active">
					<img class="d-block w-100 slideSize" src="../assets/slide-1.jpg" alt="First slide">
					<div class="carousel-caption d-none d-md-block">
						<h5>Slide 1</h5>
						<p>...</p>
					</div>
				</div>
				<div class="carousel-item">
					<img class="d-block w-100 slideSize" src="../assets/slide-2.jpg" alt="Second slide">
					<div class="carousel-caption d-none d-md-block">
						<h5>Slide 2</h5>
						<p>...</p>
					</div>
				</div>
				<div class="carousel-item">
					<img class="d-block w-100 slideSize" src="../assets/slide-3.jpg" alt="Third slide">
					<div class="carousel-caption d-none d-md-block">
						<h5>Slide 3</h5>
						<p>...</p>
					</div>
				</div>
			</div>
			<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="sr-only">Previous</span>
			</a>
			<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="sr-only">Next</span>
			</a>
		</div>

		<!-- Main -->
		<div class="flex-container">
			<div class="flex-items" v-for="item in items">
				<div class="flex-items-desciption">
					<img v-bind:src="item.image" height="180px" width="100%">
					<p class="description">
						<b>{{ item.name }}</b>
						<br/>
						<small>Rp. {{ item.price }}</small>
						<br/> {{ item.description }}
						<br/>
					</p>
				</div>
				<div class="flex-items-button" v-show="noLogin">
					<button type="button" class="btn btn-info btn-sm float-right" v-on:click="addToCart(item)">Add to Cart</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Ecommerce',
  data () {
    return {
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
    }
  },
  methods: {
    register: function () {
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
    login: function () {
      axios.post('http://35.187.252.201/login', {
        email: this.emailLogin,
        password: this.passwordLogin
      })
        .then(response => {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          console.log("ini session--", localStorage.getItem("token"))
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
    logout: function () {
      localStorage.removeItem("token");
      this.isLogin = true
      this.noLogin = false
      this.cart = []
      this.weightTotal = 0
      this.total = 0
      this.ongkir = 0
      alert('logged out')
    },
    getJenisPengiriman: function () {
      console.log('weight: ', this.weightTotal)
      console.log('city: ', this.selectedCity)
      console.log('courier', this.courier)

      axios.post('http://35.187.252.201/ongkir/price', {
        email: this.emailLogin,
        password: this.passwordLogin
      })
        .then(response => {
          console.log(response);
          localStorage.setItem('token', response.data.token);
          console.log('ini session--', localStorage.getItem('token'))
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
    findAllItem: function () {
      axios.get('http://35.187.252.201/item')
        .then(response => {
          this.items = response.data.data
          console.log(this.items);
        })
        .catch(err => {
          console.log(err)
        })
    },
    findItemByCategory: function (categoryId) {
      axios.get(`http://35.187.252.201/item/by_category/${categoryId}`)
        .then(response => {
          this.items = response.data.data
          console.log(this.items);
        })
        .catch(err => {
          console.error(err);
        })
    },
    findAllProvince: function () {
      axios.get(`http://35.187.252.201/ongkir/province`)
        .then(response => {
          this.provinces = response.data.data.rajaongkir.results
          console.log('province', this.provinces);
        })
        .catch(err => {
          console.error(err);
        })
    },
    findCityByProvince: function () {
      axios.get(`http://35.187.252.201/ongkir/city/${this.selectedProvince}`)
        .then(response => {
          this.cities = response.data.data.rajaongkir.results
          console.log('cities', this.cities);
        })
        .catch(err => {
          console.error(err);
        })
    },
    addToCart: function (itemObj) {
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
    remove: function (itemObj) {
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
    editTotal: function (itemObj) {
      this.total = 0;
      this.weightTotal = 0;
      this.cart.forEach((item) => {
        this.total += (item.price * item.amount)
        this.weightTotal += (item.amount * item.weight)
      })
      this.total += this.ongkir
    },
    getOngkir: function () {
      console.log('masuk')
      console.log('selected city: ', parseInt(this.selectedCity))
      console.log('weight total: ', this.weightTotal)
      console.log('courier', this.courier)
      axios.post('http://35.187.252.201/ongkir/price', {
        destination: parseInt(this.selectedCity),
        weight: this.weightTotal,
        courier: this.courier
      })
        .then(response => {
          this.listJenisPengiriman = response.data.data
        })
        .catch(err => {
          console.error('error');
        })
    },
    buyItem: function () {
      console.log('ini session--', localStorage.getItem('token'))
      console.log('weight: ', this.weightTotal)
      console.log('province: ', this.selectedProvince)
      console.log('city: ', this.selectedCity)
      console.log('courier', this.courier)
      console.log('jenis pengiriman: ', this.selectedJenisPengiriman)
      console.log('total: ', this.total)
      console.log('item: ', this.cart)
      let itemsId = []
      this.cart.forEach(item => {
        for(let i = 0; i < item.amount; i++) {
          itemsId.push(item._id)
        }
        console.log('itemsId-', itemsId)
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
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log(response)
          this.cart = ''
          this.provinces = ''
          this.selectedProvince = ''
          this.cities = ''
          this.selectedCity = ''
          this.total = ''
          this.weightTotal = ''
          this.ongkir = ''
          this.courier = ''
          this.listJenisPengiriman = ''
          this.selectedJenisPengiriman = ''
          alert(`transaction success!`)

        })
        .catch(err => {
          console.error(err)
          alert(`Checkout failed!`)
        })
    }
  },
  watch: {
    selectedJenisPengiriman: function (val) {
      console.log('val', val.cost[0].value)
      this.ongkir = val.cost[0].value
    }
  },
  created: function () {
    this.findAllItem()
    this.findAllProvince()
    console.log('ini session awal--', localStorage.getItem('token'))
  },
  mounted: function () {
    console.log('mounted:', localStorage.getItem('token'))
    let token = localStorage.getItem('token')
    if (token) {
      this.isLogin = false
      this.noLogin = true
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css);

.slideSize {
    width: 100%;
    max-height: 350px;
    margin: 0 auto;
}

.flex-container {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.flex-items {
    display: flex;
    flex-wrap: wrap;
    width: 220px;
    height: 350px;
    margin: 10px;
    padding: 7px;
    border: 1px solid black;
    overflow: scroll;
}

.flex-items-desciption {
    margin-top: 0;
    align-self: flex-start;
}

.flex-items-button {
    margin-left:auto;
    margin-right:0;
    align-self: flex-end;
}

.badge {
    background-color: #6394F8;
    border-radius: 10px;
    color: white;
    display: inline-block;
    font-size: 12px;
    line-height: 1;
    padding: 3px 7px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
}

.add-margin {
    margin-right: 10px;
}

.flex-items:hover {
    border: 1px solid;
    box-shadow: 5px 10px 18px #888888;
}

.pointer {
    cursor: pointer;
}

.vertical-align {
    vertical-align: bottom;
}

.cartSize {
    width: 600px;
}

#item-amount {
    width: 50px;
}

.btn-right {
    float: right;
}

.description {
    margin-top: 10px;
}
</style>
