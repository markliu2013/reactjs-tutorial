import React from 'react';
import ReactDOM from 'react-dom';
import '../style.css'

function ProductCategoryRow(props) {
    return (<tr><th colSpan="2">{props.category}</th></tr>);
}

function ProductRow(props) {
    var name = props.product.stocked ?
        props.product.name :
        <span style={{color: 'red'}}>
            {props.product.name}
        </span>;
    return (
        <tr>
            <td>{name}</td>
            <td>{props.product.price}</td>
        </tr>
    )
}

function ProductTable(props) {
    var rows = [];
    var lastCategory = null;
    props.products.forEach(function(product) {
        if (product.name.indexOf(props.filterText) === -1 || (!product.stocked && props.inStockOnly)) {
            return;
        }
        if (product.category !== lastCategory) {
            rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
        }
        rows.push(<ProductRow product={product} key={product.name} />);
        lastCategory = product.category;
    }.bind(this));
    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.filterTextInput = React.createRef();
        this.inStockOnlyInput = React.createRef();
    }
    handleInputChange(event) {
        this.props.onUserInput(this.filterTextInput.current.value, this.inStockOnlyInput.current.checked);
    }
    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref={this.filterTextInput}
                    onChange={this.handleInputChange}
                    />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.inStockOnly}
                        ref={this.inStockOnlyInput}
                        onChange={this.handleInputChange}
                        />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };
        this.handleUserInput = this.handleUserInput.bind(this);
    }
    handleUserInput(filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    }
    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                    />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    />
            </div>
        );
    }
}

var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
);