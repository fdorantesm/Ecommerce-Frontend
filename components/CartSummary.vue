<template>
    <table class="table-collapsed table-responsive">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Importe</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in cart.products" :key="product._id">
            <td>{{product.name}}</td>
            <td>{{product.qty}}</td>
            <td>{{Number(product.price).toFixed(2)}}</td>
            <td>{{Number(product.price * product.qty).toFixed(2)}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="2">Subtotal</th>
            <th>IVA</th>
            <th>Total</th>
          </tr>
          <tr>
            <td colspan="2">{{Number(cart.subtotal).toFixed(2)}}</td>
            <td>{{Number(cart.total - cart.subtotal).toFixed(2)}}</td>
            <td>{{Number(cart.total).toFixed(2)}}</td>
          </tr>
        </tfoot>
    </table>
</template>

<script>
export default {
  props: ['cart']
}
</script>
