const controller = {
  showAdminPage: (req, res) => {
    res.render("pages/adminpage");
  },

  showUserPage: (req, res) => {
    res.render("pages/userpage");
  },
};

module.exports = controller;
