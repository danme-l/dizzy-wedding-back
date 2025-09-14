'''
script to build an insert statement for updated guest list
'''

import pandas as pd

csv_file_path = '/home/dan/code/dizzy-wedding-back/guests.csv'
df = pd.read_csv(csv_file_path)
insert_statement = "INSERT INTO guests (id, first_name, last_name, email, plus_one, password_id, grooms_party, bridal_party, notes, rsvp_status, e_party) VALUES\n"
values_list = []

# iterate over the DataFrame rows to construct the value tuples
for index, row in df.iterrows():
    values_list.append(
        f"    ({row['id']}, '{row['first_name']}', '{row['last_name']}', '{row['email']}', "
        f"'{row['plus_one']}', '{row['password_id']}', '{row['grooms_party']}', "
        f"'{row['bridal_party']}', '{row['notes']}', '{row['rsvp_status']}', '{row['e_party']}')"
    )

# make an INSERT statement
insert_statement += ",\n".join(values_list)
insert_statement += "\nON CONFLICT (id) DO UPDATE SET\n"
insert_statement += "    first_name = EXCLUDED.first_name,\n"
insert_statement += "    last_name = EXCLUDED.last_name,\n"
insert_statement += "    email = EXCLUDED.email,\n"
insert_statement += "    plus_one = EXCLUDED.plus_one,\n"
insert_statement += "    password_id = EXCLUDED.password_id,\n"
insert_statement += "    grooms_party = EXCLUDED.grooms_party,\n"
insert_statement += "    bridal_party = EXCLUDED.bridal_party,\n"
insert_statement += "    notes = EXCLUDED.notes,\n"
insert_statement += "    rsvp_status = EXCLUDED.rsvp_status,\n"
insert_statement += "    e_party = EXCLUDED.e_party;"

# print the final INSERT statement
print(insert_statement)
