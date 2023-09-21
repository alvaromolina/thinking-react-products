import './App.css';
import { useState } from 'react';

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

function ProductCategoryRow({category}){
  return <tr>
    <th colSpan="2">{category}</th>
  </tr>
}

function ProductRow({product}){
  return <tr>
    <td className={`${!product.stocked ? "red" : ""}`}>
      {product.name }
    </td>
    <td>
      {product.price }
    </td>
  </tr>
}
function ProductTable({products, filterText, inStockOnly}){
  let rows = []
  let category = null
  products.forEach(product => {
    if(!product.stocked && inStockOnly){
      return
    }
    if(!product.name.toLowerCase().includes(filterText.toLowerCase()) ){
      return
    }
    if(category !== product.category){
      rows.push(<ProductCategoryRow category={product.category}/>)
    }
    rows.push(<ProductRow product={product}/>)
    category = product.category
  });

  return (
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>

  );

}

function SearchBar( {filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }){

  return (
    <form>
      <input type="text" onChange={(event)=> onFilterTextChange(event.target.value)}
      value={filterText} placeholder="Search..." />
      <label>
        <input onChange={(event)=> onInStockOnlyChange(event.target.checked)} type="checkbox" checked={inStockOnly} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}
function FilterableProductTable({products}){

  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false)
  return (
    <>
      <SearchBar filterText = {filterText} 
      inStockOnly={inStockOnly} 
      onFilterTextChange={setFilterText}
      onInStockOnlyChange={setInStockOnly}
       />
      <ProductTable products={products} filterText = {filterText} inStockOnly={inStockOnly}/>
    </>
  );
}

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}