# GET /user/:token

    유저 데이터를 받아오는 쿼리입니다
    
> Require

    token : 유저 토큰을 의미합니다
    
> Response : Success

    status : 200
    data : Schema[User] 참조
    
> Response : Fail
    
    status : 401
    message : Unauthorized Token
    

# GET /data/user/:name

    유저 이름으로 검색
    
> Require

    name : 검색할 유저를 의미합니다
    
> Response : Success

    status : 200
    data : Schema[User] 참조
    
> Response : Fail

    status : 404
    message : "User Not FOund"
    
    
# GET /data/user/:phone_number

    유저 이름으로 검색
    
> Require

    phone_number : 검색할 유저를 의미합니다
    
> Response : Success

    status : 200
    data : Schema[User] 참조
    
> Response : Fail

    status : 404
    message : "User Not FOund"
    
