'''
script to build an insert statement for updated password list
'''

import pandas as pd

csv_file_path = '/home/dan/code/dizzy-wedding-back/passwords.csv'
df = pd.read_csv(csv_file_path)
insert_statement = "INSERT INTO passwords (id, group_password, invite_type, is_vip) VALUES\n"
values_list = []

# iterate over the DataFrame rows to construct the value tuples
for index, row in df.iterrows():
    values_list.append(
        f"    ({row['id']}, '{row['group_password']}', '{row['invite_type']}',   '{row['is_vip']}')"
    )

# make an INSERT statement
insert_statement += ",\n".join(values_list)
insert_statement += "\nON CONFLICT (id) DO UPDATE SET\n"
insert_statement += "    group_password = EXCLUDED.group_password,\n"
insert_statement += "    is_vip = EXCLUDED.is_vip,\n"
insert_statement += "    invite_type = EXCLUDED.invite_type;\n"

# print the final INSERT statement
print(insert_statement)
