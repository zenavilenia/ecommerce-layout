<template>
<div>
  <div class="navigator">
    <button type="button" class="btn btn-danger btn-md btn-add" v-on:click="logout">Logout</button>
    <button type="button" class="btn btn-danger btn-md btn-logout"  data-toggle="modal"
      data-target="#modalAdd">Add Item</button>
  </div>
  <div id="modalAdd" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" align="left">Add Item</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <form class="ivu-form ivu-form-label-right">
            <div class="form-group">
              <label class="form-title">Name</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i>
                  <input type="text" placeholder="Item Name" class="form-control" v-model="addThisItem.name">
                  </div>
                </div>
              </div>
            <div class="form-group">
              <label class="form-title">Image</label>
              <div class="form-group-content">
                <div class="">
                  <input type="file" class="form-control" id="recipient-name" @change="getPhotoAdd">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Description</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i>
                  <textarea placeholder="Item Short Description" rows="2" class="form-control" v-model="addThisItem.description"></textarea>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Price</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i>
                  <input type="text" placeholder="Item Price" class="form-control" v-model="addThisItem.price">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Stock</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i>
                  <input type="text" placeholder="Item Stock" class="form-control" v-model="addThisItem.stock">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Weight</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i>
                  <input type="text" placeholder="Item Weight" class="form-control" v-model="addThisItem.weight">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Category</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i> 
                  <select class="form-control form-control-sm" data-live-search="true" v-model="addThisItem.category">
                    <option v-for="(category,i) in categories" :value="category._id" :key="i" selected> {{ category.name }} </option>
									</select>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button class="btn btn-primary" @click="addItem">Save</button>
        </div>
      </div>
    </div>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Image</th>
        <th>Description</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Weight</th>
        <th>Category</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,i) in items" :key="i">
        <td>{{ i+1 }}</td>
        <td>{{ item.name }}</td>
        <td><img v-bind:src="item.image" height="50px" width="50px"></td>
        <td>{{ item.description }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.stock }}</td>
        <td>{{ item.weight }}</td>
        <td>{{ item.categoryId.name }}</td>
        <td><button type="button" class="btn btn-success btn-sm" @click="changeItem(item)" data-toggle="modal"
      data-target="#modalEdit">Edit</button> | <button type="button" class="btn btn-danger btn-sm" @click="deleteItem(item._id)">Delete</button></td>
      </tr>
    </tbody>
  </table>
  <div id="modalEdit" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" align="left">Edit Item</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <form class="ivu-form ivu-form-label-right">
            <div class="form-group">
              <label class="form-title">Name</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i>
                  <input type="text" placeholder="Item Name" class="form-control" v-model="selectedItem.name">
                  </div>
                </div>
              </div>
            <div class="form-group">
              <label class="form-title">Image</label>
              <div class="form-group-content">
                <div class="">
                  <br><br>
                  <div v-if="!fileEdit">
                    <img :src="selectedItem.image" height="200" width="200" class="image-edit">
                  </div>
                  <input type="file" class="form-control" id="recipient-name" @change="getPhoto">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Description</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i>
                  <textarea placeholder="Item Short Description" rows="2" class="form-control" v-model="selectedItem.description"></textarea>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Price</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i>
                  <input type="text" placeholder="Item Price" class="form-control" v-model="selectedItem.price">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Stock</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i>
                  <input type="text" placeholder="Item Stock" class="form-control" v-model="selectedItem.stock">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Weight</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i>
                  <input type="text" placeholder="Item Weight" class="form-control" v-model="selectedItem.weight">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Category</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i> 
                  <select class="form-control form-control-sm" data-live-search="true" v-model="selectedCategory">
                    <option v-for="(category,i) in categories" :key="i" :value="category._id" selected> {{ category.name }} </option>
									</select>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button class="btn btn-primary" @click="editItem">Save</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Admin',
  data () {
    return {
      addThisItem: {},
      fileAdd: null,
      fileEdit: null,
      formData: new FormData(), 
      formDataAdd: new FormData(),
      items: [],
      categories: [],
      selectedCategory: '',
      selectedItem: ''
    }
  },
  methods: {
    addItem: function () {
      this.formDataAdd.set('image', this.fileAdd)
      this.formDataAdd.set('description', this.addThisItem.description)
      this.formDataAdd.set('name', this.addThisItem.name)
      this.formDataAdd.set('price', this.addThisItem.price)
      this.formDataAdd.set('stock', this.addThisItem.stock)
      this.formDataAdd.set('weight', this.addThisItem.weight)
      this.formDataAdd.set('categoryId', this.addThisItem.category)
      axios({
        method: 'post',
        url: 'http://35.187.252.201/item',
        data: this.formDataAdd,
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(({ data }) => {
        console.log(data)
        location.reload()
      })
    },
    getPhotoAdd: function (event) {
      this.fileAdd = event.target.files[0]
      console.log("image to add--", this.fileAdd)
    },
    getPhoto: function (event) {
      this.fileEdit = event.target.files[0]
      console.log("image--", this.fileEdit)
    },
    changeItem: function (item) {
      this.selectedItem = item;
      console.log(this.selectedItem)
    },
    editItem: function () {
      console.log("edit this item ", this.selectedItem)
      console.log("file--", this.fileEdit)
      if(this.fileEdit) {
        this.formData.set('id', this.selectedItem._id)
        this.formData.set('image', this.fileEdit)
        this.formData.set('description', this.selectedItem.description)
        this.formData.set('name', this.selectedItem.name)
        this.formData.set('price', this.selectedItem.price)
        this.formData.set('stock', this.selectedItem.stock)
        this.formData.set('weight', this.selectedItem.weight)
        this.formData.set('categoryId', this.selectedItem.categoryId._id)
        axios({
          method: 'put',
          url: 'http://35.187.252.201/item',
          data: this.formData,
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(({ data }) => {
          console.log(data)
          location.reload()
        })
      } else {
        // no photo
        console.log('masuk no image')
        axios.put('http://35.187.252.201/item/noImage', {
          id: this.selectedItem._id,
          name: this.selectedItem.name,
          description: this.selectedItem.description,
          price: this.selectedItem.price,
          stock: this.selectedItem.stock,
          weight: this.selectedItem.weight,
          categoryId: this.selectedItem.categoryId._id
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            console.log(data)
            location.reload()
          })
      }
    },
    deleteItem: function (id) {
      axios.delete(`http://35.187.252.201/item/${id}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log('ini err', err);
        });
    },
    logout: function () {
      localStorage.removeItem('token');
      alert('logged out');
      this.$router.push('/');
    }
  },
  created: function () {
    console.log('masuk sini')
    axios.get('http://35.187.252.201/item', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(response => {
        this.items = response.data.data
        console.log(this.items);
      })
      .catch(err => {
        console.log(err)
      })
    
    axios.get('http://35.187.252.201/category', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(response => {
        this.categories = response.data.data
        console.log('categories ', this.categories)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navigator {
  height: 50px;
  margin-top: 10px;
  margin-right: 10px;
}

.btn-add {
  float: right;
}

.modal-title {
  float: left;
}

.form-title {
  float: left;
}

.image-edit {
  float: left;
}
</style>