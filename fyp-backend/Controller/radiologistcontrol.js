const Radiologist = require("./model");

async function signup(req, res) {
    try {
      const {
        name,
        hospitalID,
        username, 
        password,
      } = req.body;
      console.log("body", req.body);
  
      const customerExists = await Customer.findOne({ email, username });
  
      if (!customerExists) {
        const customer = await Customer.create({
          name,
          hospitalID,
          username,
          password,
          patients: [],
        });
  
        res.status(200).send({
          message: "Radiologist signup successfully",
          data: customer, // Sending back the created customer data
        });
      } else {
        res.status(400).send({
          message: "Customer already exists",
        });
      }
    } catch (error) {
      console.error(error); // Using console.error for better error visibility
      res.status(500).send({
        message: "An error occurred during the signup process.",
        error: error.message, // Providing the error message for debugging
      });
    }
  }
/*
  async function login(req, res) {
    try {
      const { username, password } = req.body;
      console.log(req.body);
      let radiologist;
  
      if (!username || !password) {
        res.status(401).send({
          message: "Invalid username or password",
        });
      } else {
        radiologist = await Radiologist.findOne({ username });
        console.log("Radiologist fetched");
        if (!radiologist || !(await bcrypt.compare(password, radiologist.password))) {
          res.status(401).send({
            message: "Invalid username or password",
          });
        } else {
          const secretKey = process.env.SECRET_KEY;
  
          const token = await jwt.sign({ radiologist }, secretKey, {
            expiresIn: "1hr",
          });
          console.log(token);
  
          const refToken = await jwt.sign(
            { customer },
            process.env.REFRESH_TOKEN_SECRET,
            {
              expiresIn: "8hr",
            }
          );
          console.log(token);
  
          res
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .cookie("refreshToken", refToken, {
              httpOnly: true,
            })
            .status(200)
            .send({
              message: "customer login successfully",
              data: customer,
            });
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function resetPassword(req, res) {
    try {
      const { username, password, newPassword, confirmPassword } = req.body;
  
      const customer = await Customer.findOne({ username });
      console.log(customer.password);
      console.log(password);
  
      if (!(await bcrypt.compare(password, customer.password))) {
        res.status(401).send({
          message: "incorrect password",
        });
      } else if (newPassword != confirmPassword) {
        res.status(400).send({
          message: "password does not match",
        });
      } else {
        console.log(newPassword);
        const hashPassword = bcrypt.hashSync(newPassword, 10);
  
        const updatedCustomer = await Customer.updateOne({
          password: hashPassword,
        });
  
        res.status(200).send({
          message: "Password updated successfully",
          data: updatedCustomer,
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  async function forgetPassword(req, res) {
    try {
      const { username, newPassword, confirmPassword } = req.body;
  
      const customer = await Customer.findOne({ username });
      console.log(customer);
  
      if (customer) {
        if (newPassword === confirmPassword) {
          const hashPassword = bcrypt.hashSync(newPassword, 10);
  
          const updateCustomerPassword = await Customer.updateOne({
            password: hashPassword,
          });
  
          res.status(200).send({
            message: "Password updated successfully",
            data: updateCustomerPassword,
          });
        } else {
          res.status(400).send({
            message: "Passwords donot match",
          });
        }
      } else {
        res.status(400).send({
          message: "Customer not found or password donot match",
        });
      }
    } catch (error) {}
  }
*/
  module.exports = {
    signup,
    //login,
    //forgetPassword,
    //resetPassword,
  }