# GET : /hand/:couple_room_token

    잡고있는지 아닌지 확인하는 쿼리
    
> Require
    
    couple_room_token : 커플 룸 토큰을 의미합니다
    Data type : String
    
> Response : Success

    status : 200
    hand: Boolean
  
> Response : Fail

    status:404,
    message:'Couple Not Found'
    
# POST : /hand/update

    잡고있는지 아닌지 여부를 업데이트
    
> Require
    
    color_room_token : 커플 룸 토큰을 의미합니다
    Data type : String
  
    
    hand : 손잡고있는지 여부
    Data type : Boolean
    
> Response : Success

    status:200
    hand : true
    
> Response : Success

    status:200
    hand : false