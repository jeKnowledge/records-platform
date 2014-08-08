Meteor.methods({
  'addata': function (ata_subject, ata_date, ata_department, ata_content) {
    Atas.insert({ subject: ata_subject,
                  date: ata_date,
                  department: ata_department,
                  content: ata_content
    });
  },
  'updateata': function ( ata_subject, ata_date, ata_department, ata_content, ata_id) {
    Atas.update( { _id: ata_id },
                 { subject: ata_subject, date: ata_date, department: ata_department, content: ata_content }
    );
  }
});
