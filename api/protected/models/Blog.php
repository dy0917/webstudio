<?php

/**
 * This is the model class for table "blog".
 *
 * The followings are the available columns in table 'blog':
 * @property integer $id
 * @property string $title
 * @property string $body
 * @property integer $type
 * @property integer $author_id
 * @property string $created
 * @property string $last_update
 *
 * The followings are the available model relations:
 * @property User $author
 */
class Blog extends CActiveRecord {

    /**
     * @return string the associated database table name
     */
    public function tableName() {
        return 'blog';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('type, author_id', 'numerical', 'integerOnly' => true),
            array('title', 'length', 'max' => 45),
            array('body, created, last_update', 'safe'),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('id, title, body, type, author_id, created, last_update', 'safe', 'on' => 'search'),
        );
    }

    /**
     * @return array relational rules.
     */
    public function relations() {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array(
            'author' => array(self::BELONGS_TO, 'User', 'author_id'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels() {
        return array(
            'id' => 'ID',
            'title' => 'Title',
            'body' => 'Body',
            'type' => 'Type',
            'author_id' => 'Author',
            'created' => 'Created',
            'last_update' => 'Last Update',
        );
    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     *
     * Typical usecase:
     * - Initialize the model fields with values from filter form.
     * - Execute this method to get CActiveDataProvider instance which will filter
     * models according to data in model fields.
     * - Pass data provider to CGridView, CListView or any similar widget.
     *
     * @return CActiveDataProvider the data provider that can return the models
     * based on the search/filter conditions.
     */
    public function search() {
        // @todo Please modify the following code to remove attributes that should not be searched.

        $criteria = new CDbCriteria;

        $criteria->compare('id', $this->id);
        $criteria->compare('title', $this->title, true);
        $criteria->compare('body', $this->body, true);
        $criteria->compare('type', $this->type);
        $criteria->compare('author_id', $this->author_id);
        $criteria->compare('created', $this->created, true);
        $criteria->compare('last_update', $this->last_update, true);

        return new CActiveDataProvider($this, array(
            'criteria' => $criteria,
        ));
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return Blog the static model class
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }


}
