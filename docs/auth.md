# POST : /auth/login

    로그인하는 쿼리입니다
    
> Require

    id : 유저 아이디를 의미합니다
    Data type : String
      
    password : 유저 비밀번호를 의미합니다
    Data type : String
    
> Response : Success

    status:200
    data : user_token
    
> Response : Fail
    
    status : 401
    message : Unauthorized Token
    
# POST : /auth/register

    회원가입하는 쿼리입니다
    
> Require

    id : 유저 아이디를 의미합니다
    Data type : String
      
    password : 유저 비밀번호를 의미합니다
    Data type : String
      
    name : 유저 이름을 의미합니다
    Data type : String
      
    gender : 유저 성별을 의미합니다
    Data type : String
      
    EX :
    남성 , 여성
      
    phone_number : 유저 전화번호를 의미합니다
    Data type : String
  
    profile_img_url : 유저 프로필 사진 URL을 의미합니다
    Data type : String
    multipart name : profile