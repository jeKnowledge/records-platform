var isValidDate = function (date) {
  var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(date);
  if (matches == null) return false;
  var d = matches[2];
  var m = matches[1] - 1;
  var y = matches[3];
  var composedDate = new Date(y, m, d);
  return composedDate.getDate() == d &&
    composedDate.getMonth() == m &&
    composedDate.getFullYear() == y;
}

Meteor.methods({
  'addata': function (ata_subject, ata_date, ata_department, ata_content) {
    if (!ata_subject) {
      throw new Meteor.Error(411, 'Ata subject is too small.');
    }

    if (!isValidDate(ata_date)) {
      throw new Meteor.Error(400, 'Ata date is not valid.');
    }

    if (!ata_content) {
      throw new Meteor.Error(411, 'Ata content is too small.');
    }

    Atas.insert({ subject: ata_subject,
                  date: ata_date,
                  department: ata_department,
                  content: ata_content
    });
  },
  'updateata': function ( ata_subject, ata_date, ata_department, ata_content, ata_id) {
    if (!ata_subject) {
      throw new Meteor.Error(411, 'Ata subject is too small.');
    }
    
    if (!isValidDate(ata_date)) {
      throw new Meteor.Error(400, 'Ata date is not valid.');
    }

    if (!ata_content) {
      throw new Meteor.Error(411, 'Ata content is too small.');
    }

    Atas.update( { _id: ata_id },
                 { subject: ata_subject, date: ata_date, department: ata_department, content: ata_content }
    );
  }
});
