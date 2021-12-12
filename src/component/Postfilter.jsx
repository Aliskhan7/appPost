import React from 'react'
import MyInput from './UI/Input/MyInput'
import MySelect from './UI/Select/MySelect'

function Postfilter ({filter, setFilter}) {
  return (
    <div>
      <MyInput
        value={filter.query}
        onChange={e => setFilter({...filter, query: e.target.value})}
      />
      <MySelect
        value={filter.sort}
        onChange={selectSort => setFilter({...filter, sort: selectSort})}
        defaultValue='Сортировка'
        options={[
          {value: 'title', name: 'По названию'},
          {value: 'body', name: 'По содержанию'},
        ]}
      />
    </div>
  )
}

export default Postfilter