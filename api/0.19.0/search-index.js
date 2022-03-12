crystal_doc_search_index_callback({"repository_name":"sqlite3","body":"# crystal-sqlite3 [![Build Status](https://travis-ci.org/crystal-lang/crystal-sqlite3.svg?branch=master)](https://travis-ci.org/crystal-lang/crystal-sqlite3)\n\nSQLite3 bindings for [Crystal](http://crystal-lang.org/).\n\nCheck [crystal-db](https://github.com/crystal-lang/crystal-db) for general db driver documentation. crystal-sqlite3 driver is registered under `sqlite3://` uri.\n\n## Installation\n\nAdd this to your application's `shard.yml`:\n\n```yml\ndependencies:\n  sqlite3:\n    github: crystal-lang/crystal-sqlite3\n```\n\n### Usage\n\n```crystal\nrequire \"sqlite3\"\n\nDB.open \"sqlite3://./data.db\" do |db|\n  db.exec \"create table contacts (name text, age integer)\"\n  db.exec \"insert into contacts values (?, ?)\", \"John Doe\", 30\n\n  args = [] of DB::Any\n  args << \"Sarah\"\n  args << 33\n  db.exec \"insert into contacts values (?, ?)\", args: args\n\n  puts \"max age:\"\n  puts db.scalar \"select max(age) from contacts\" # => 33\n\n  puts \"contacts:\"\n  db.query \"select name, age from contacts order by age desc\" do |rs|\n    puts \"#{rs.column_name(0)} (#{rs.column_name(1)})\"\n    # => name (age)\n    rs.each do\n      puts \"#{rs.read(String)} (#{rs.read(Int32)})\"\n      # => Sarah (33)\n      # => John Doe (30)\n    end\n  end\nend\n```\n\n### DB::Any\n\n* `Time` is implemented as `TEXT` column using `SQLite3::DATE_FORMAT_SUBSECOND` format (or `SQLite3::DATE_FORMAT_SECOND` if the text does not contain a dot).\n* `Bool` is implemented as `INT` column mapping `0`/`1` values.\n","program":{"html_id":"sqlite3/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"locations":[],"repository_name":"sqlite3","program":true,"enum":false,"alias":false,"const":false,"types":[{"html_id":"sqlite3/SQLite3","path":"SQLite3.html","kind":"module","full_name":"SQLite3","name":"SQLite3","abstract":false,"locations":[{"filename":"src/sqlite3.cr","line_number":4,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3.cr#L4"},{"filename":"src/sqlite3/connection.cr","line_number":1,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/connection.cr#L1"},{"filename":"src/sqlite3/flags.cr","line_number":25,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L25"},{"filename":"src/sqlite3/version.cr","line_number":1,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/version.cr#L1"}],"repository_name":"sqlite3","program":false,"enum":false,"alias":false,"const":false,"constants":[{"id":"DATE_FORMAT_SECOND","name":"DATE_FORMAT_SECOND","value":"\"%F %H:%M:%S\""},{"id":"DATE_FORMAT_SUBSECOND","name":"DATE_FORMAT_SUBSECOND","value":"\"%F %H:%M:%S.%L\""},{"id":"VERSION","name":"VERSION","value":"\"0.19.0\""}],"macros":[{"html_id":"flags(*values)-macro","name":"flags","doc":"Same as doing SQLite3::Flag.flag(*values)","summary":"<p>Same as doing SQLite3::Flag.flag(*values)</p>","abstract":false,"args":[{"name":"values","external_name":"values","restriction":""}],"args_string":"(*values)","args_html":"(*values)","location":{"filename":"src/sqlite3/flags.cr","line_number":27,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L27"},"def":{"name":"flags","args":[{"name":"values","external_name":"values","restriction":""}],"splat_index":0,"visibility":"Public","body":"    ::SQLite3::Flag.flags(\n{{ *values }}\n)\n  \n"}}],"types":[{"html_id":"sqlite3/SQLite3/Connection","path":"SQLite3/Connection.html","kind":"class","full_name":"SQLite3::Connection","name":"Connection","abstract":false,"superclass":{"html_id":"sqlite3/DB/Connection","kind":"class","full_name":"DB::Connection","name":"Connection"},"ancestors":[{"html_id":"sqlite3/DB/Connection","kind":"class","full_name":"DB::Connection","name":"Connection"},{"html_id":"sqlite3/DB/BeginTransaction","kind":"module","full_name":"DB::BeginTransaction","name":"BeginTransaction"},{"html_id":"sqlite3/DB/SessionMethods","kind":"module","full_name":"DB::SessionMethods","name":"SessionMethods"},{"html_id":"sqlite3/DB/QueryMethods","kind":"module","full_name":"DB::QueryMethods","name":"QueryMethods"},{"html_id":"sqlite3/DB/Disposable","kind":"module","full_name":"DB::Disposable","name":"Disposable"},{"html_id":"sqlite3/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"sqlite3/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/sqlite3/connection.cr","line_number":1,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/connection.cr#L1"}],"repository_name":"sqlite3","program":false,"enum":false,"alias":false,"const":false,"namespace":{"html_id":"sqlite3/SQLite3","kind":"module","full_name":"SQLite3","name":"SQLite3"},"class_methods":[{"html_id":"filename(uri:URI)-class-method","name":"filename","abstract":false,"args":[{"name":"uri","external_name":"uri","restriction":"URI"}],"args_string":"(uri : URI)","args_html":"(uri : URI)","location":{"filename":"src/sqlite3/connection.cr","line_number":13,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/connection.cr#L13"},"def":{"name":"filename","args":[{"name":"uri","external_name":"uri","restriction":"URI"}],"visibility":"Public","body":"URI.decode_www_form((uri.host || \"\") + uri.path)"}}],"constructors":[{"html_id":"new(database)-class-method","name":"new","abstract":false,"args":[{"name":"database","external_name":"database","restriction":""}],"args_string":"(database)","args_html":"(database)","location":{"filename":"src/sqlite3/connection.cr","line_number":2,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/connection.cr#L2"},"def":{"name":"new","args":[{"name":"database","external_name":"database","restriction":""}],"visibility":"Public","body":"_ = allocate\n_.initialize(database)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"html_id":"build_prepared_statement(query):Statement-instance-method","name":"build_prepared_statement","doc":":nodoc:","summary":"<p>:nodoc:</p>","abstract":false,"args":[{"name":"query","external_name":"query","restriction":""}],"args_string":"(query) : Statement","args_html":"(query) : <a href=\"../SQLite3/Statement.html\">Statement</a>","location":{"filename":"src/sqlite3/connection.cr","line_number":17,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/connection.cr#L17"},"def":{"name":"build_prepared_statement","args":[{"name":"query","external_name":"query","restriction":""}],"return_type":"Statement","visibility":"Public","body":"Statement.new(self, query)"}},{"html_id":"build_unprepared_statement(query):Statement-instance-method","name":"build_unprepared_statement","doc":":nodoc:","summary":"<p>:nodoc:</p>","abstract":false,"args":[{"name":"query","external_name":"query","restriction":""}],"args_string":"(query) : Statement","args_html":"(query) : <a href=\"../SQLite3/Statement.html\">Statement</a>","location":{"filename":"src/sqlite3/connection.cr","line_number":21,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/connection.cr#L21"},"def":{"name":"build_unprepared_statement","args":[{"name":"query","external_name":"query","restriction":""}],"return_type":"Statement","visibility":"Public","body":"raise(DB::Error.new(\"SQLite3 driver does not support unprepared statements\"))"}},{"html_id":"do_close-instance-method","name":"do_close","doc":"Implementors overrides this method to perform resource cleanup\nIf an exception is raised, the resource will not be marked as closed.","summary":"<p>Implementors overrides this method to perform resource cleanup If an exception is raised, the resource will not be marked as closed.</p>","abstract":false,"location":{"filename":"src/sqlite3/connection.cr","line_number":31,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/connection.cr#L31"},"def":{"name":"do_close","visibility":"Public","body":"super()\ncheck(LibSQLite3.close(self))\n"}},{"html_id":"dump(to:SQLite3::Connection)-instance-method","name":"dump","doc":"Dump the database to another SQLite3 database. This can be used for backing up a SQLite3 Database\nto disk or the opposite","summary":"<p>Dump the database to another SQLite3 database.</p>","abstract":false,"args":[{"name":"to","external_name":"to","restriction":"SQLite3::Connection"}],"args_string":"(to : SQLite3::Connection)","args_html":"(to : <a href=\"../SQLite3/Connection.html\">SQLite3::Connection</a>)","location":{"filename":"src/sqlite3/connection.cr","line_number":68,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/connection.cr#L68"},"def":{"name":"dump","args":[{"name":"to","external_name":"to","restriction":"SQLite3::Connection"}],"visibility":"Public","body":"backup_item = LibSQLite3.backup_init(to.@db, \"main\", @db, \"main\")\nif backup_item.null?\n  raise(Exception.new(to.@db))\nend\ncode = LibSQLite3.backup_step(backup_item, -1)\nif code != LibSQLite3::Code::DONE\n  raise(Exception.new(to.@db))\nend\ncode = LibSQLite3.backup_finish(backup_item)\nif code != LibSQLite3::Code::OKAY\n  raise(Exception.new(to.@db))\nend\n"}},{"html_id":"to_unsafe:LibSQLite3::SQLite3-instance-method","name":"to_unsafe","abstract":false,"location":{"filename":"src/sqlite3/connection.cr","line_number":84,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/connection.cr#L84"},"def":{"name":"to_unsafe","visibility":"Public","body":"@db"}}]},{"html_id":"sqlite3/SQLite3/Driver","path":"SQLite3/Driver.html","kind":"class","full_name":"SQLite3::Driver","name":"Driver","abstract":false,"superclass":{"html_id":"sqlite3/DB/Driver","kind":"class","full_name":"DB::Driver","name":"Driver"},"ancestors":[{"html_id":"sqlite3/DB/Driver","kind":"class","full_name":"DB::Driver","name":"Driver"},{"html_id":"sqlite3/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"sqlite3/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/sqlite3/driver.cr","line_number":1,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/driver.cr#L1"}],"repository_name":"sqlite3","program":false,"enum":false,"alias":false,"const":false,"namespace":{"html_id":"sqlite3/SQLite3","kind":"module","full_name":"SQLite3","name":"SQLite3"},"instance_methods":[{"html_id":"build_connection(context:DB::ConnectionContext):SQLite3::Connection-instance-method","name":"build_connection","abstract":false,"args":[{"name":"context","external_name":"context","restriction":"DB::ConnectionContext"}],"args_string":"(context : DB::ConnectionContext) : SQLite3::Connection","args_html":"(context : DB::ConnectionContext) : <a href=\"../SQLite3/Connection.html\">SQLite3::Connection</a>","location":{"filename":"src/sqlite3/driver.cr","line_number":2,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/driver.cr#L2"},"def":{"name":"build_connection","args":[{"name":"context","external_name":"context","restriction":"DB::ConnectionContext"}],"return_type":"SQLite3::Connection","visibility":"Public","body":"SQLite3::Connection.new(context)"}}]},{"html_id":"sqlite3/SQLite3/Exception","path":"SQLite3/Exception.html","kind":"class","full_name":"SQLite3::Exception","name":"Exception","abstract":false,"superclass":{"html_id":"sqlite3/Exception","kind":"class","full_name":"Exception","name":"Exception"},"ancestors":[{"html_id":"sqlite3/Exception","kind":"class","full_name":"Exception","name":"Exception"},{"html_id":"sqlite3/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"sqlite3/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/sqlite3/exception.cr","line_number":2,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/exception.cr#L2"}],"repository_name":"sqlite3","program":false,"enum":false,"alias":false,"const":false,"namespace":{"html_id":"sqlite3/SQLite3","kind":"module","full_name":"SQLite3","name":"SQLite3"},"doc":"Exception thrown on invalid SQLite3 operations.","summary":"<p>Exception thrown on invalid SQLite3 operations.</p>","constructors":[{"html_id":"new(db)-class-method","name":"new","abstract":false,"args":[{"name":"db","external_name":"db","restriction":""}],"args_string":"(db)","args_html":"(db)","location":{"filename":"src/sqlite3/exception.cr","line_number":6,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/exception.cr#L6"},"def":{"name":"new","args":[{"name":"db","external_name":"db","restriction":""}],"visibility":"Public","body":"_ = allocate\n_.initialize(db)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"html_id":"code:Int32-instance-method","name":"code","doc":"The internal code associated with the failure.","summary":"<p>The internal code associated with the failure.</p>","abstract":false,"location":{"filename":"src/sqlite3/exception.cr","line_number":4,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/exception.cr#L4"},"def":{"name":"code","visibility":"Public","body":"@code"}}]},{"html_id":"sqlite3/SQLite3/Flag","path":"SQLite3/Flag.html","kind":"enum","full_name":"SQLite3::Flag","name":"Flag","abstract":false,"ancestors":[{"html_id":"sqlite3/Enum","kind":"struct","full_name":"Enum","name":"Enum"},{"html_id":"sqlite3/Comparable","kind":"module","full_name":"Comparable","name":"Comparable"},{"html_id":"sqlite3/Value","kind":"struct","full_name":"Value","name":"Value"},{"html_id":"sqlite3/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/sqlite3/flags.cr","line_number":2,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L2"}],"repository_name":"sqlite3","program":false,"enum":true,"alias":false,"const":false,"constants":[{"id":"READONLY","name":"READONLY","value":"1"},{"id":"READWRITE","name":"READWRITE","value":"2","doc":"Ok for sqlite3_open_v2()","summary":"<p>Ok for sqlite3_open_v2()</p>"},{"id":"CREATE","name":"CREATE","value":"4","doc":"Ok for sqlite3_open_v2()","summary":"<p>Ok for sqlite3_open_v2()</p>"},{"id":"DELETEONCLOSE","name":"DELETEONCLOSE","value":"8","doc":"Ok for sqlite3_open_v2()","summary":"<p>Ok for sqlite3_open_v2()</p>"},{"id":"EXCLUSIVE","name":"EXCLUSIVE","value":"16","doc":"VFS only","summary":"<p>VFS only</p>"},{"id":"AUTOPROXY","name":"AUTOPROXY","value":"32","doc":"VFS only","summary":"<p>VFS only</p>"},{"id":"URI","name":"URI","value":"64","doc":"VFS only","summary":"<p>VFS only</p>"},{"id":"MEMORY","name":"MEMORY","value":"128","doc":"Ok for sqlite3_open_v2()","summary":"<p>Ok for sqlite3_open_v2()</p>"},{"id":"MAIN_DB","name":"MAIN_DB","value":"256","doc":"Ok for sqlite3_open_v2()","summary":"<p>Ok for sqlite3_open_v2()</p>"},{"id":"TEMP_DB","name":"TEMP_DB","value":"512","doc":"VFS only","summary":"<p>VFS only</p>"},{"id":"TRANSIENT_DB","name":"TRANSIENT_DB","value":"1024","doc":"VFS only","summary":"<p>VFS only</p>"},{"id":"MAIN_JOURNAL","name":"MAIN_JOURNAL","value":"2048","doc":"VFS only","summary":"<p>VFS only</p>"},{"id":"TEMP_JOURNAL","name":"TEMP_JOURNAL","value":"4096","doc":"VFS only","summary":"<p>VFS only</p>"},{"id":"SUBJOURNAL","name":"SUBJOURNAL","value":"8192","doc":"VFS only","summary":"<p>VFS only</p>"},{"id":"MASTER_JOURNAL","name":"MASTER_JOURNAL","value":"16384","doc":"VFS only","summary":"<p>VFS only</p>"},{"id":"NOMUTEX","name":"NOMUTEX","value":"32768","doc":"VFS only","summary":"<p>VFS only</p>"},{"id":"FULLMUTEX","name":"FULLMUTEX","value":"65536","doc":"Ok for sqlite3_open_v2()","summary":"<p>Ok for sqlite3_open_v2()</p>"},{"id":"SHAREDCACHE","name":"SHAREDCACHE","value":"131072","doc":"Ok for sqlite3_open_v2()","summary":"<p>Ok for sqlite3_open_v2()</p>"},{"id":"PRIVATECACHE","name":"PRIVATECACHE","value":"262144","doc":"Ok for sqlite3_open_v2()","summary":"<p>Ok for sqlite3_open_v2()</p>"},{"id":"WAL","name":"WAL","value":"524288","doc":"Ok for sqlite3_open_v2()","summary":"<p>Ok for sqlite3_open_v2()</p>"}],"namespace":{"html_id":"sqlite3/SQLite3","kind":"module","full_name":"SQLite3","name":"SQLite3"},"instance_methods":[{"html_id":"autoproxy?-instance-method","name":"autoproxy?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":8,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L8"},"def":{"name":"autoproxy?","visibility":"Public","body":"self.includes?(AUTOPROXY)"}},{"html_id":"create?-instance-method","name":"create?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":5,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L5"},"def":{"name":"create?","visibility":"Public","body":"self.includes?(CREATE)"}},{"html_id":"deleteonclose?-instance-method","name":"deleteonclose?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":6,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L6"},"def":{"name":"deleteonclose?","visibility":"Public","body":"self.includes?(DELETEONCLOSE)"}},{"html_id":"exclusive?-instance-method","name":"exclusive?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":7,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L7"},"def":{"name":"exclusive?","visibility":"Public","body":"self.includes?(EXCLUSIVE)"}},{"html_id":"fullmutex?-instance-method","name":"fullmutex?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":19,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L19"},"def":{"name":"fullmutex?","visibility":"Public","body":"self.includes?(FULLMUTEX)"}},{"html_id":"main_db?-instance-method","name":"main_db?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":11,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L11"},"def":{"name":"main_db?","visibility":"Public","body":"self.includes?(MAIN_DB)"}},{"html_id":"main_journal?-instance-method","name":"main_journal?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":14,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L14"},"def":{"name":"main_journal?","visibility":"Public","body":"self.includes?(MAIN_JOURNAL)"}},{"html_id":"master_journal?-instance-method","name":"master_journal?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":17,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L17"},"def":{"name":"master_journal?","visibility":"Public","body":"self.includes?(MASTER_JOURNAL)"}},{"html_id":"memory?-instance-method","name":"memory?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":10,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L10"},"def":{"name":"memory?","visibility":"Public","body":"self.includes?(MEMORY)"}},{"html_id":"nomutex?-instance-method","name":"nomutex?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":18,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L18"},"def":{"name":"nomutex?","visibility":"Public","body":"self.includes?(NOMUTEX)"}},{"html_id":"none?-instance-method","name":"none?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":2,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L2"},"def":{"name":"none?","visibility":"Public","body":"value == 0"}},{"html_id":"privatecache?-instance-method","name":"privatecache?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":21,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L21"},"def":{"name":"privatecache?","visibility":"Public","body":"self.includes?(PRIVATECACHE)"}},{"html_id":"readonly?-instance-method","name":"readonly?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":3,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L3"},"def":{"name":"readonly?","visibility":"Public","body":"self.includes?(READONLY)"}},{"html_id":"readwrite?-instance-method","name":"readwrite?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":4,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L4"},"def":{"name":"readwrite?","visibility":"Public","body":"self.includes?(READWRITE)"}},{"html_id":"sharedcache?-instance-method","name":"sharedcache?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":20,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L20"},"def":{"name":"sharedcache?","visibility":"Public","body":"self.includes?(SHAREDCACHE)"}},{"html_id":"subjournal?-instance-method","name":"subjournal?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":16,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L16"},"def":{"name":"subjournal?","visibility":"Public","body":"self.includes?(SUBJOURNAL)"}},{"html_id":"temp_db?-instance-method","name":"temp_db?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":12,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L12"},"def":{"name":"temp_db?","visibility":"Public","body":"self.includes?(TEMP_DB)"}},{"html_id":"temp_journal?-instance-method","name":"temp_journal?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":15,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L15"},"def":{"name":"temp_journal?","visibility":"Public","body":"self.includes?(TEMP_JOURNAL)"}},{"html_id":"transient_db?-instance-method","name":"transient_db?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":13,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L13"},"def":{"name":"transient_db?","visibility":"Public","body":"self.includes?(TRANSIENT_DB)"}},{"html_id":"uri?-instance-method","name":"uri?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":9,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L9"},"def":{"name":"uri?","visibility":"Public","body":"self.includes?(URI)"}},{"html_id":"wal?-instance-method","name":"wal?","abstract":false,"location":{"filename":"src/sqlite3/flags.cr","line_number":22,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/flags.cr#L22"},"def":{"name":"wal?","visibility":"Public","body":"self.includes?(WAL)"}}]},{"html_id":"sqlite3/SQLite3/ResultSet","path":"SQLite3/ResultSet.html","kind":"class","full_name":"SQLite3::ResultSet","name":"ResultSet","abstract":false,"superclass":{"html_id":"sqlite3/DB/ResultSet","kind":"class","full_name":"DB::ResultSet","name":"ResultSet"},"ancestors":[{"html_id":"sqlite3/DB/ResultSet","kind":"class","full_name":"DB::ResultSet","name":"ResultSet"},{"html_id":"sqlite3/DB/Disposable","kind":"module","full_name":"DB::Disposable","name":"Disposable"},{"html_id":"sqlite3/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"sqlite3/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/sqlite3/result_set.cr","line_number":1,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/result_set.cr#L1"}],"repository_name":"sqlite3","program":false,"enum":false,"alias":false,"const":false,"namespace":{"html_id":"sqlite3/SQLite3","kind":"module","full_name":"SQLite3","name":"SQLite3"},"instance_methods":[{"html_id":"column_count:Int32-instance-method","name":"column_count","doc":"Returns the number of columns in the result","summary":"<p>Returns the number of columns in the result</p>","abstract":false,"location":{"filename":"src/sqlite3/result_set.cr","line_number":97,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/result_set.cr#L97"},"def":{"name":"column_count","return_type":"Int32","visibility":"Public","body":"LibSQLite3.column_count(self)"}},{"html_id":"column_name(index):String-instance-method","name":"column_name","abstract":false,"args":[{"name":"index","external_name":"index","restriction":""}],"args_string":"(index) : String","args_html":"(index) : String","location":{"filename":"src/sqlite3/result_set.cr","line_number":101,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/result_set.cr#L101"},"def":{"name":"column_name","args":[{"name":"index","external_name":"index","restriction":""}],"return_type":"String","visibility":"Public","body":"String.new(LibSQLite3.column_name(self, index))"}},{"html_id":"move_next:Bool-instance-method","name":"move_next","doc":"Advances to the next row. Returns `true` if there's a next row,\n`false` otherwise. Must be called at least once to advance to the first\nrow.","summary":"<p>Advances to the next row.</p>","abstract":false,"location":{"filename":"src/sqlite3/result_set.cr","line_number":12,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/result_set.cr#L12"},"def":{"name":"move_next","return_type":"Bool","visibility":"Public","body":"@column_index = 0\ncase step\nwhen LibSQLite3::Code::ROW\n  true\nwhen LibSQLite3::Code::DONE\n  false\nelse\n  raise(Exception.new(sqlite3_statement.sqlite3_connection))\nend\n"}},{"html_id":"next_column_index:Int32-instance-method","name":"next_column_index","doc":"Returns the column index that corresponds to the next `#read`.\n\nIf the last column of the current row has been read, it must return `#column_count`.","summary":"<p>Returns the column index that corresponds to the next <code><a href=\"../SQLite3/ResultSet.html#read-instance-method\">#read</a></code>.</p>","abstract":false,"location":{"filename":"src/sqlite3/result_set.cr","line_number":50,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/result_set.cr#L50"},"def":{"name":"next_column_index","return_type":"Int32","visibility":"Public","body":"@column_index"}},{"html_id":"read(t:Int32.class):Int32-instance-method","name":"read","abstract":false,"args":[{"name":"t","external_name":"t","restriction":"Int32.class"}],"args_string":"(t : Int32.class) : Int32","args_html":"(t : <span class=\"t\">Int32</span>.<span class=\"k\">class</span>) : Int32","location":{"filename":"src/sqlite3/result_set.cr","line_number":54,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/result_set.cr#L54"},"def":{"name":"read","args":[{"name":"t","external_name":"t","restriction":"Int32.class"}],"return_type":"Int32","visibility":"Public","body":"(read(Int64)).to_i32"}},{"html_id":"read(type:(Int32|::Nil).class):Int32?-instance-method","name":"read","abstract":false,"args":[{"name":"type","external_name":"type","restriction":"(Int32 | ::Nil).class"}],"args_string":"(type : (Int32 | ::Nil).class) : Int32?","args_html":"(type : (<span class=\"t\">Int32</span> <span class=\"o\">|</span> <span class=\"t\">::</span><span class=\"t\">Nil</span>).<span class=\"k\">class</span>) : Int32?","location":{"filename":"src/sqlite3/result_set.cr","line_number":58,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/result_set.cr#L58"},"def":{"name":"read","args":[{"name":"type","external_name":"type","restriction":"(Int32 | ::Nil).class"}],"return_type":"Int32 | ::Nil","visibility":"Public","body":"(read(::Union(Int64, ::Nil))).try(&.to_i32)"}},{"html_id":"read(t:Float32.class):Float32-instance-method","name":"read","abstract":false,"args":[{"name":"t","external_name":"t","restriction":"Float32.class"}],"args_string":"(t : Float32.class) : Float32","args_html":"(t : <span class=\"t\">Float32</span>.<span class=\"k\">class</span>) : Float32","location":{"filename":"src/sqlite3/result_set.cr","line_number":62,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/result_set.cr#L62"},"def":{"name":"read","args":[{"name":"t","external_name":"t","restriction":"Float32.class"}],"return_type":"Float32","visibility":"Public","body":"(read(Float64)).to_f32"}},{"html_id":"read(type:(Float32|::Nil).class):Float32?-instance-method","name":"read","abstract":false,"args":[{"name":"type","external_name":"type","restriction":"(Float32 | ::Nil).class"}],"args_string":"(type : (Float32 | ::Nil).class) : Float32?","args_html":"(type : (<span class=\"t\">Float32</span> <span class=\"o\">|</span> <span class=\"t\">::</span><span class=\"t\">Nil</span>).<span class=\"k\">class</span>) : Float32?","location":{"filename":"src/sqlite3/result_set.cr","line_number":66,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/result_set.cr#L66"},"def":{"name":"read","args":[{"name":"type","external_name":"type","restriction":"(Float32 | ::Nil).class"}],"return_type":"Float32 | ::Nil","visibility":"Public","body":"(read(::Union(Float64, ::Nil))).try(&.to_f32)"}},{"html_id":"read(t:Time.class):Time-instance-method","name":"read","abstract":false,"args":[{"name":"t","external_name":"t","restriction":"Time.class"}],"args_string":"(t : Time.class) : Time","args_html":"(t : <span class=\"t\">Time</span>.<span class=\"k\">class</span>) : Time","location":{"filename":"src/sqlite3/result_set.cr","line_number":70,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/result_set.cr#L70"},"def":{"name":"read","args":[{"name":"t","external_name":"t","restriction":"Time.class"}],"return_type":"Time","visibility":"Public","body":"text = read(String)\nif text.includes?(\".\")\n  Time.parse(text, SQLite3::DATE_FORMAT_SUBSECOND, location: SQLite3::TIME_ZONE)\nelse\n  Time.parse(text, SQLite3::DATE_FORMAT_SECOND, location: SQLite3::TIME_ZONE)\nend\n"}},{"html_id":"read(t:(Time|::Nil).class):Time?-instance-method","name":"read","abstract":false,"args":[{"name":"t","external_name":"t","restriction":"(Time | ::Nil).class"}],"args_string":"(t : (Time | ::Nil).class) : Time?","args_html":"(t : (<span class=\"t\">Time</span> <span class=\"o\">|</span> <span class=\"t\">::</span><span class=\"t\">Nil</span>).<span class=\"k\">class</span>) : Time?","location":{"filename":"src/sqlite3/result_set.cr","line_number":79,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/result_set.cr#L79"},"def":{"name":"read","args":[{"name":"t","external_name":"t","restriction":"(Time | ::Nil).class"}],"return_type":"Time | ::Nil","visibility":"Public","body":"(read(::Union(String, ::Nil))).try do |v|\n  if v.includes?(\".\")\n    Time.parse(v, SQLite3::DATE_FORMAT_SUBSECOND, location: SQLite3::TIME_ZONE)\n  else\n    Time.parse(v, SQLite3::DATE_FORMAT_SECOND, location: SQLite3::TIME_ZONE)\n  end\nend"}},{"html_id":"read(t:Bool.class):Bool-instance-method","name":"read","abstract":false,"args":[{"name":"t","external_name":"t","restriction":"Bool.class"}],"args_string":"(t : Bool.class) : Bool","args_html":"(t : <span class=\"t\">Bool</span>.<span class=\"k\">class</span>) : Bool","location":{"filename":"src/sqlite3/result_set.cr","line_number":89,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/result_set.cr#L89"},"def":{"name":"read","args":[{"name":"t","external_name":"t","restriction":"Bool.class"}],"return_type":"Bool","visibility":"Public","body":"(read(Int64)) != 0"}},{"html_id":"read(t:(Bool|::Nil).class):Bool?-instance-method","name":"read","abstract":false,"args":[{"name":"t","external_name":"t","restriction":"(Bool | ::Nil).class"}],"args_string":"(t : (Bool | ::Nil).class) : Bool?","args_html":"(t : (<span class=\"t\">Bool</span> <span class=\"o\">|</span> <span class=\"t\">::</span><span class=\"t\">Nil</span>).<span class=\"k\">class</span>) : Bool?","location":{"filename":"src/sqlite3/result_set.cr","line_number":93,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/result_set.cr#L93"},"def":{"name":"read","args":[{"name":"t","external_name":"t","restriction":"(Bool | ::Nil).class"}],"return_type":"Bool | ::Nil","visibility":"Public","body":"(read(::Union(Int64, ::Nil))).try(&.!=(0))"}},{"html_id":"read-instance-method","name":"read","doc":"Reads the next column value","summary":"<p>Reads the next column value</p>","abstract":false,"location":{"filename":"src/sqlite3/result_set.cr","line_number":25,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/result_set.cr#L25"},"def":{"name":"read","visibility":"Public","body":"col = @column_index\nvalue = case LibSQLite3.column_type(self, col)\nwhen Type::INTEGER\n  LibSQLite3.column_int64(self, col)\nwhen Type::FLOAT\n  LibSQLite3.column_double(self, col)\nwhen Type::BLOB\n  blob = LibSQLite3.column_blob(self, col)\n  bytes = LibSQLite3.column_bytes(self, col)\n  ptr = Pointer(UInt8).malloc(bytes)\n  ptr.copy_from(blob, bytes)\n  Bytes.new(ptr, bytes)\nwhen Type::TEXT\n  String.new(LibSQLite3.column_text(self, col))\nwhen Type::NULL\n  nil\nelse\n  raise(Exception.new(sqlite3_statement.sqlite3_connection))\nend\n@column_index = @column_index + 1\nvalue\n"}},{"html_id":"to_unsafe-instance-method","name":"to_unsafe","abstract":false,"location":{"filename":"src/sqlite3/result_set.cr","line_number":105,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/result_set.cr#L105"},"def":{"name":"to_unsafe","visibility":"Public","body":"sqlite3_statement.to_unsafe"}}]},{"html_id":"sqlite3/SQLite3/Statement","path":"SQLite3/Statement.html","kind":"class","full_name":"SQLite3::Statement","name":"Statement","abstract":false,"superclass":{"html_id":"sqlite3/DB/Statement","kind":"class","full_name":"DB::Statement","name":"Statement"},"ancestors":[{"html_id":"sqlite3/DB/Statement","kind":"class","full_name":"DB::Statement","name":"Statement"},{"html_id":"sqlite3/DB/StatementMethods","kind":"module","full_name":"DB::StatementMethods","name":"StatementMethods"},{"html_id":"sqlite3/DB/Disposable","kind":"module","full_name":"DB::Disposable","name":"Disposable"},{"html_id":"sqlite3/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"sqlite3/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/sqlite3/statement.cr","line_number":1,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/statement.cr#L1"}],"repository_name":"sqlite3","program":false,"enum":false,"alias":false,"const":false,"namespace":{"html_id":"sqlite3/SQLite3","kind":"module","full_name":"SQLite3","name":"SQLite3"},"constructors":[{"html_id":"new(connection,command)-class-method","name":"new","abstract":false,"args":[{"name":"connection","external_name":"connection","restriction":""},{"name":"command","external_name":"command","restriction":""}],"args_string":"(connection, command)","args_html":"(connection, command)","location":{"filename":"src/sqlite3/statement.cr","line_number":2,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/statement.cr#L2"},"def":{"name":"new","args":[{"name":"connection","external_name":"connection","restriction":""},{"name":"command","external_name":"command","restriction":""}],"visibility":"Public","body":"_ = allocate\n_.initialize(connection, command)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"html_id":"to_unsafe:LibSQLite3::Statement-instance-method","name":"to_unsafe","abstract":false,"location":{"filename":"src/sqlite3/statement.cr","line_number":88,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/statement.cr#L88"},"def":{"name":"to_unsafe","visibility":"Public","body":"@stmt"}}]},{"html_id":"sqlite3/SQLite3/Type","path":"SQLite3/Type.html","kind":"enum","full_name":"SQLite3::Type","name":"Type","abstract":false,"ancestors":[{"html_id":"sqlite3/Enum","kind":"struct","full_name":"Enum","name":"Enum"},{"html_id":"sqlite3/Comparable","kind":"module","full_name":"Comparable","name":"Comparable"},{"html_id":"sqlite3/Value","kind":"struct","full_name":"Value","name":"Value"},{"html_id":"sqlite3/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/sqlite3/type.cr","line_number":2,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/type.cr#L2"}],"repository_name":"sqlite3","program":false,"enum":true,"alias":false,"const":false,"constants":[{"id":"INTEGER","name":"INTEGER","value":"1"},{"id":"FLOAT","name":"FLOAT","value":"2"},{"id":"BLOB","name":"BLOB","value":"4"},{"id":"NULL","name":"NULL","value":"5"},{"id":"TEXT","name":"TEXT","value":"3"}],"namespace":{"html_id":"sqlite3/SQLite3","kind":"module","full_name":"SQLite3","name":"SQLite3"},"doc":"Each of the possible types of an SQLite3 column.","summary":"<p>Each of the possible types of an SQLite3 column.</p>","instance_methods":[{"html_id":"blob?-instance-method","name":"blob?","abstract":false,"location":{"filename":"src/sqlite3/type.cr","line_number":5,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/type.cr#L5"},"def":{"name":"blob?","visibility":"Public","body":"self == BLOB"}},{"html_id":"float?-instance-method","name":"float?","abstract":false,"location":{"filename":"src/sqlite3/type.cr","line_number":4,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/type.cr#L4"},"def":{"name":"float?","visibility":"Public","body":"self == FLOAT"}},{"html_id":"integer?-instance-method","name":"integer?","abstract":false,"location":{"filename":"src/sqlite3/type.cr","line_number":3,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/type.cr#L3"},"def":{"name":"integer?","visibility":"Public","body":"self == INTEGER"}},{"html_id":"null?-instance-method","name":"null?","abstract":false,"location":{"filename":"src/sqlite3/type.cr","line_number":6,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/type.cr#L6"},"def":{"name":"null?","visibility":"Public","body":"self == NULL"}},{"html_id":"text?-instance-method","name":"text?","abstract":false,"location":{"filename":"src/sqlite3/type.cr","line_number":7,"url":"https://github.com/crystal-lang/crystal-sqlite3/blob/v0.19.0/src/sqlite3/type.cr#L7"},"def":{"name":"text?","visibility":"Public","body":"self == TEXT"}}]}]}]}})