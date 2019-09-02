const checkLogin = function(res){
  console.log(res.data)
  if(res.data && res.data.code === "01"){
    location.href = "/user/login?sendURL=" + location.href
    return false
  }
}

export default {
  checkLogin
}