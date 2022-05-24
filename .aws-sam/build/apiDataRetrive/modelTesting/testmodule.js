class User {
    constructor(name,city, age, email) {
      this.name = name;
      this.city = city;
      this.age = age;
      this.email = email;
    }
  
    getUserStats() {
      return `
        Name: ${this.name}
        City: ${this.city}
        Age: ${this.age}
        Email: ${this.email}
      `;
    }
  }
  
  module.exports = User;