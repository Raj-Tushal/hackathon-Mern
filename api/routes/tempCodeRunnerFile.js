async(req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true});
        if(!updatedHotel){
            res.status(NOTFOUND).json(sendError({status:false,message:UPDATE_UNSUCCESS_MESSAGES}))
        }
       res.status(OK).json(sendSuccess({status:true,message:UPDATE_SUCCESS_MESSAGES}))
    } catch (error) {
        res.status(500).json(error);
    }
}