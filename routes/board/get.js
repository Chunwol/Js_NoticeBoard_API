const Board = require('../../database').board;

exports.get_board = async (req, res) => {
    const { pk } = req.params;

    const board = await Board.findAll({
        where:  pk ? { pk } : { } 
    })
    .catch(err => {
        res.status(500).json({ success: false });
    });

    if(board[0]){
        res.status(200).json({ success: true, board });
    } else{
        res.status(412).json({ success: false });
    }
};