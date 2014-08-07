Meteor.methods({
  'addata': function (ata_subject, ata_date, ata_content) {
    Atas.insert({ subject: ata_subject,
                  date: ata_date,
                  content: ata_content
    });
  }
});
