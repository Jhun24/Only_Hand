# GET : /couple/data/:couple_room_token

    커플 데이터
    
> Require

    couple_room_token : 커플 방 토큰
    
> Response : Success

    status : 200
    couple_data:Schema[Couple] 참고,
    male_data:Schema[User] 참고,
    female_data:Schema[User] 참고
    
> Response : Fail

    status:401
    message : Unauthorized Couple Room Token
    
> Response : Fail

    status : 401
    message : Unauthorized Male Token

> Response : Fail

    status : 401
    message : Unauthorized Female Token
     
# GET : /couple/d_day/:couple_room_token

    커플 디데이
    
> Require

    couple_room_token : 커플 방 토큰

> Response : Success

    status : 200
    data : d_day
    
# GET : /couple/album/:couple_room_token

    커플 디데이
    
> Require

    couple_room_token : 커플 방 토큰

> Response : Success

    status : 200
    data : album (Array in Objecy)
    
     

> Response : Fail

    status : 401
    message : 'Unauthorized Couple Room Token'