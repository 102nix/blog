import reactWiresImage from '../../assets/imgs/react_wires.png'
import ReactHooks from '../../assets/imgs/react_hooks.png'
import JavaScript from '../../assets/imgs/JavaScript.jpg'
import startReact from '../../assets/imgs/reactjs.png'
import useState from '../../assets/imgs/useState2.png'
import useEffect from '../../assets/imgs/useEffect.jpeg'
import useRef from '../../assets/imgs/useRef.jpg'
import useContext from '../../assets/imgs/useContext.jpg'
import useReducer from '../../assets/imgs/useReducer.png'

const articles = [
  {
    id: '67rdca3eeb7f6fgeed471198',
    title: 'Что такое React',
    article: 'React — это JavaScript-библиотека для создания пользовательских интерфейсов. Обратите внимание, что это именно библиотека, а не фреймворк. React часто называют фреймворком, но это ошибка. ~ Во-первых, его использование ни к чему вас не обязывает, не формирует «фрейм» проекта. ~ Во-вторых, React выполняет единственную задачу: показывает на странице компонент интерфейса, синхронизируя его с данными приложения, и только этой библиотеки в общем случае недостаточно для того, чтобы полностью реализовать проект. ~ Вскоре после появления React и подобные ему решения (Vue.js, Svelte) практически захватили мир фронтенда: потому что они помогают решать проблемы, основываясь на идее декларативного программирования, а не на императивном подходе. ~ React разрабатывается и поддерживается Facebook, Instagram и сообществом отдельных разработчиков и корпораций. React позволяет повторно использовать компоненты, которые были разработаны в других приложениях, использующих ту же функцию. Возможность повторного использования компонента является явным преимуществом для разработчиков. Компонент React создать проще, поскольку он использует JSX (англ), опциональное расширение синтаксиса JavaScript, которое позволяет комбинировать HTML с JavaScript. ~ JSX – это отличная смесь JavaScript и HTML (англ). Оно делает весь процесс написания структуры сайта более понятным. Кроме того, расширение также значительно упрощает рендеринг нескольких функций. Хотя JSX может быть не самым популярным расширением синтаксиса, оно доказало свою эффективность при разработке специальных компонентов или приложений большого объема. React эффективно обновляет процесс DOM (объектная модель документа). Большая часть React написана с использованием JSX (JavaScript XML), а не стандартного JavaScript (JS). Здесь важно отметить, что это делается для того, чтобы максимально упростить процесс создания React-компонентов. Кроме того, идея JSX в React заключалась в том, что Facebook (как первоначальный разработчик) хотел создать один конкретный тип расширения синтаксиса с чёткой и однозначной конфигурацией.',
    img: startReact
  },
  {
    id: '67rdca3eeb7f6fgeed000001',
    title: 'React-хук useState',
    article: 'UseState — это хук. Мы вызываем его, чтобы наделить наш функциональный компонент внутренним состоянием. React будет хранить это состояние между рендерами. ~ Вызов useState возвращает массив с двумя элементами, который содержит: текущее значение состояния и функцию для его обновления. Эту функцию можно использовать где угодно, например, в обработчике событий. Она схожа с this.setState в классах, но не сливает новое и старое состояние вместе. Сравнение хука useState и this.state приводится на странице Использование хука состояния. ~ Единственный аргумент useState — это начальное состояние. В примере выше — это 0, так как наш счётчик начинается с нуля. Заметьте, что в отличие от this.state, в нашем случае состояние может, но не обязано, быть объектом. Исходное значение аргумента используется только при первом рендере. Хук состояния можно использовать в компоненте более одного раза. ~ Синтаксис деструктуризации массивов позволяет нам по-разному называть переменные состояния, которые мы объявляем при вызове useState. Так как имён этих переменных нет в API useState, React предполагает, что если вы вызываете useState много раз, вы делаете это в одинаковой последовательности при каждом рендере.',
    img: useState
  },
  {
    id: '67rdca3eeb7f6fgeed000002',
    title: 'React-хук useEffect',
    article: 'Хук useEffect позволяет управлять различными сопутствующими действиями в функциональном компоненте или то, что называется "side effects" (побочные эффекты), например, извлечение данных, ручное изменение структуры DOM, использование таймеров, логгирование и т.д.. ~ То есть в useEffect выполняет те действия, которые мы не можем выполнить в основной части функционального компонента. Этот хук фактически служит той же цели, что методы жизненного цикла componentDidMount, componentDidUpdate и componentWillUnmount в классах-компонентах. ~ В качестве параметра в useEffect() передается функция. При вызове хука useEffect по сути определяется "эффект", который затем применяется в приложении. Когда именно применяется? По умолчанию React применяет эффект после каждого рендеринга, в том числе при первом рендеринге приложения. Причем поскольку подобные эффекты определены внутри компонента, они имеют доступ к объекту props и к состоянию компонента. ~ По умолчанию эффект выполняется при каждом повторном рендеринге на веб-странице, однако мы можем указать, чтобы React не применял эффект, если определенные значения не изменились между с момента последнего рендеринга. Для этого в useEffect в качестве необязательного параметра передается массив аргументов.',
    img: useEffect
  },
  {
    id: '67rdca3eeb7f6fgeed000003',
    title: 'React-хук useRef',
    article: 'Хук useRef возвращает изменяемый ref-объект, свойство .current которого инициализируется переданным аргументом (initialValue). Возвращённый объект будет сохраняться в течение всего времени жизни компонента. ~ По сути, useRef похож на «коробку», которая может содержать изменяемое значение в своём свойстве .current. Но хук useRef() полезен не только установкой атрибута с рефом. Он удобен для сохранения любого мутируемого значения, по аналогии с тем, как вы используете поля экземпляра в классах. ~ Это возможно, поскольку useRef() создаёт обычный JavaScript-объект. Единственная разница между useRef() и просто созданием самого объекта {current: ...} — это то, что хук useRef даст один и тот же объект с рефом при каждом рендере. ~ Для того, чтобы начать работать с ссылками в функциональных компонентах, React требуется инициализировать хук useRef, передав в него начальное значение. После инициализации данный хук вернет ref-объект со свойством current. ~ Работа со ссылками в React с использованием useRef – очень удобный способ работы с DOM элементам. Хук useRef не приводит к повторному перерендериванию компонента даже когда происходит изменение данных в нем. C другой стороны злоупотребление работы со ссылками в React компонентах будет вести к нарушению работы в виртуальном DOM, о чем всегда необходимо помнить.',
    img: useRef
  },
  {
    id: '67rdca3eeb7f6fgeed000004',
    title: 'React-хук useContext',
    article: 'Поговорим о контексте в React и работе с хуком useContext. онтекст в React это способность передачи данных через дерево компонентов, минуя прокидывание данных через пропсы от одного компонента к другому. Если посмотреть на историю развития React, то мы увидим, что до создания Flux, Reflux, Redux и Mobx решений все данные передавались от самого верхнего компонента к нижним через пропсы, иногда минуя огромные цепочки связанных компонентов. Это было крайне неудобное решение, если приложение насчитывало сотни, а иногда даже и тысячи связанных компонентов. Чтобы решить данною проблему, разработчики React придумали Context API, благодаря которому процесс передачи стал гораздо проще и лаконичнее. ~ Для создания контекста достаточно воспользоваться методом React.createContext, он имеет единственный параметр, в который можно передать дефолтное значение или объект для получения дочерних компонентов через контекст. ~ Вызывая React.createContext, мы получаем объект, который содержит два компонента, позволяющие взаимодействовать с ним. ~ Компонент Provider. После создания контекста, его требуется использовать совместно с компонентом Provider, который позволяет дочерним компонентам подписаться на его изменения. Если проще, то благодаря компоненту Provider все дочерние компоненты могут получить значения, которые мы ему передаем. ~ Компонент Consumer. Второй компонент, который находится в объекте после вызова React.createContext является Consumer. Он предназначен для подписи на изменение контекста в функциональном компоненте. В качестве дочернего компонента он принимает функцию, которая получает контекст и возвращает React компонент. Благодаря компоненту Consumer у нас есть возможность получать значения из контекста в компонентах.',
    img: useContext
  },
  {
    id: '67rdca3eeb7f6fgeed000005',
    title: 'React-хук useReduce',
    article: 'Данный хук является альтернативой хуку useState и применяется в случаях, когда первоначальный стейт является более сложным и многосоставным или в моменты, когда новое состояние зависит от предыдущего. ~ Хук useReducer принимает три параметра. Первым параметром является функция редьюсер, идея работы которой взята из Redux. Она получает текущее состояние и экшен с типом для его изменения. ~ Второй параметр, передаваемый useReducer являет начальное состояние, которое и попадает в первый аргумент нашего редьюсера. Третим параметром является функция для «ленивой» инициализации первоначального состояния. ~ Данная функция позволяет убрать логику из редьюсера для расчета начального состояния и в основном используется в качестве динамических изменений в начальных состояниях или для быстрого доступа к «сбросу» до этого состояния. ~ После вызова useReducer возвращает массив с состоянием и функцией dispatch. Для изменения состояния в редьюсере и получения нового стейта, достаточно передать в функцию dispatch нужный экшен. Как видите, данный механизм повторяет логику работы с Redux.',
    img: useReducer
  }
]

const mainInfo = [
  {
    id: '67rdca3eeb7f6fgeed000001',
    img: reactWiresImage,
    text: 'React — JavaScript-библиотека с открытым исходным кодом для разработки пользовательских интерфейсов. React разрабатывается и поддерживается Facebook, Instagram и сообществом отдельных разработчиков и корпораций.'
  },
  {
    id: '67rdca3eeb7f6fgeed000002',
    img: ReactHooks,
    text: 'Хуки — нововведение в React 16.8, которое позволяет использовать состояние и другие возможности React без написания классов. Хуки позволяют использовать все возможности React без написания классовых компонентов. '
  },
  {
    id: '67rdca3eeb7f6fgeed000003',
    img: JavaScript,
    text: 'JavaScript язык программирования, который позволяет вам создать динамически обновляемый контент, управляет мультимедиа, анимирует изображения. JavaScript – один из самых популярных языков программирования в мире.'
  }
]

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(articles)
    }, 2000)
  })
const fetchAllMain = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(mainInfo)
    }, 2000)
  })

const getById = (id) =>
  new Promise(resolve => {
    window.setTimeout(() => {
      resolve(articles.find(article => article.id === id))
    }, 1000)
  })

export default {
  fetchAll,
  fetchAllMain,
  getById
}