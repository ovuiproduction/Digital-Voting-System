const insertVoter = async () => {
    try {
        const newVoter = new VoterDetails({
            epic: 'EPI1234567',
            voterName: 'Onkar Anil Waghmode',
            voterState: 'StateName',
            voterDistrict: 'Solapur',
            voterAssembly: 'Madha',
            dateOfBirth: new Date('2004-03-10'),
            gender: 'Male',
            address: {
                street: 'Madha-Solapur Main-Road',
                city: 'Madha',
                state: 'Maharashtra',
                pincode: '413209'
            },
            contact: {
                email: 'onkar.waghmode22@vit.edu',
                phone: '7385677315'
            }
        });
        await newVoter.save();
        console.log('Voter inserted successfully');
        
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting voter:', error);
    }
};


app.get('/addVoter',(req,res)=>{
    insertVoter();
    res.send("Voter Added Successfully...");
});



const AdminDetails = require('./models/AdminDetails.js')
const insertAdmin = async () => {
  try {
      const newAdmin = new AdminDetails({
          adminId: 'EPI1234567',
          adminName: 'Onkar Anil Waghmode',
          adminState: 'StateName',
          adminDistrict: 'Solapur',
          adminAssembly: 'Madha',
          dateOfBirth: new Date('2004-03-10'),
          gender: 'Male',
          address: {
              street: 'Madha-Solapur Main-Road',
              city: 'Madha',
              state: 'Maharashtra',
              pincode: '413209'
          },
          contact: {
              email: 'onkar.waghmode22@vit.edu',
              phone: '7385677315'
          }
      });
      await newAdmin.save();
      console.log('Admin inserted successfully');
      mongoose.connection.close();
  } catch (error) {
      console.error('Error inserting Admin:', error);
  }
};

app.get('/addAdmin',(req,res)=>{
  insertAdmin();
  res.send("Admin Added Successfully...");
});