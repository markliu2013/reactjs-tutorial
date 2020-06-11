// https://blog.csdn.net/qq_30638831/article/details/89045908

import React from 'react';
import ReactDOM from 'react-dom';

// theme-context.js
export const themes = {
  light: {
    foreground: '#ffffff',
    background: '#222222',
  },
  dark: {
    foreground: '#000000',
    background: '#eeeeee',
  },
};

export const ThemeContext = React.createContext(
  themes.dark // 默认值
);

// themed-button.js consumer设置
function ThemedButton(props) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button
          {...props}
          style={{backgroundColor: theme.background}}
        />

      )}
    </ThemeContext.Consumer>
  );
}


// 一个使用到ThemedButton组件的中间组件
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // ThemedButton 位于 ThemeProvider 内
    // 在外部使用时使用来自 state 里面的 theme
    // 默认 dark theme
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <Toolbar changeTheme={this.toggleTheme} />
      </ThemeContext.Provider>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)













