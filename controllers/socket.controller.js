class SocketController {
  seat = async (req, res) => {
    try {
      res.status(200).json({ message: "소켓서버 접속에 성공하였습니다." });
    } catch (err) {
      res.status(400).json({
        errorMessage: "소켓서버 접속에 실패하였습니다.",
      });
    }
  };
}

module.exports = SocketController;
