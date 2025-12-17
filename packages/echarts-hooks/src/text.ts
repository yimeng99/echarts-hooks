

Promise.reject().catch(err => {
  console.log(0)
}).then(() => {
  console.log(1)
}).catch(err => {
  console.log(2)
})
