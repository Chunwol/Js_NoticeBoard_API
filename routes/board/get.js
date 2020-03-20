const Board = require('../../database').board;
const Comment = require('../../database').comment;

exports.get_board = async (req, res) => {
    const { type } = req.body
    
    switch(type){
        case "post":
            const { pk } = req.params;
            if(pk){
                const board = await Board.findOne({
                    include: [{ model: Comment}],
                    where: { pk }
                })
                .catch(err => {
                    res.status(500).json({ success: false, err });
                });
                if(board){
                    res.status(200).json({ success: true, board });
                } else{
                    res.status(412).json({ success: false });
                }
            } else{
                res.status(412).json({ success: false });
            }
            break;

        case "list":
            const board = await Board.findAll()
            .catch(err => {
                res.status(500).json({ success: false });
            });
            res.status(200).json({ success: true, board });
            break;
            
        default:
            res.status(412).json({ success: false });
    }
};